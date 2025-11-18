"use strict";

module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    "Teacher",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      nip: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      underscored: true,
      tableName: "teachers",
    }
  );

  Teacher.associate = function (models) {
    Teacher.hasMany(models.Classroom, { foreignKey: "homeroom_teacher_id" });
    // Many-to-many: a teacher can teach many subjects
    Teacher.belongsToMany(models.Subject, {
      through: models.TeacherSubject,
      foreignKey: "teacher_id",
      otherKey: "subject_id",
      as: "subjects",
    });
  };

  return Teacher;
};
