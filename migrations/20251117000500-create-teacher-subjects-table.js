"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // create pivot table without inline FK definitions to avoid MySQL FK formation issues
    await queryInterface.createTable("teacher_subjects", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teacher_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      subject_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // add foreign key constraints explicitly
    await queryInterface.addConstraint("teacher_subjects", {
      fields: ["teacher_id"],
      type: "foreign key",
      name: "fk_teacher_subjects_teacher",
      references: {
        table: "teachers",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("teacher_subjects", {
      fields: ["subject_id"],
      type: "foreign key",
      name: "fk_teacher_subjects_subject",
      references: {
        table: "subjects",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // migrate existing subject.teacher_id into pivot (if any)
    // This raw query will insert rows for subjects that already have teacher_id assigned
    await queryInterface.sequelize.query(
      `INSERT INTO teacher_subjects (teacher_id, subject_id, created_at, updated_at)
       SELECT teacher_id, id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM subjects WHERE teacher_id IS NOT NULL`
    );

    // remove the old teacher_id column from subjects
    const tableInfo = await queryInterface.describeTable("subjects");
    if (tableInfo.teacher_id) {
      await queryInterface.removeColumn("subjects", "teacher_id");
    }
  },

  down: async (queryInterface, Sequelize) => {
    // add teacher_id back to subjects (nullable)
    const tableInfo = await queryInterface.describeTable("subjects");
    if (!tableInfo.teacher_id) {
      await queryInterface.addColumn("subjects", "teacher_id", {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: { model: "teachers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });

      // try to restore teacher_id from pivot (choose first teacher if many exist)
      await queryInterface.sequelize.query(
        `UPDATE subjects SET teacher_id = (
           SELECT teacher_id FROM teacher_subjects WHERE subject_id = subjects.id LIMIT 1
         ) WHERE EXISTS (SELECT 1 FROM teacher_subjects WHERE subject_id = subjects.id)`
      );
    }

    // drop pivot table
    await queryInterface.dropTable("teacher_subjects");
  },
};
