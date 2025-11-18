"use strict";

module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define(
    "Subject",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      grade: {
        type: DataTypes.INTEGER,
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
      tableName: "subjects",
    }
  );

  Subject.associate = function (models) {
    // Many-to-many: a subject can be taught by many teachers
    Subject.belongsToMany(models.Teacher, {
      through: models.TeacherSubject,
      foreignKey: "subject_id",
      otherKey: "teacher_id",
      as: "teachers",
    });
  };

  return Subject;
};
