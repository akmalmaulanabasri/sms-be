"use strict";

module.exports = (sequelize, DataTypes) => {
  const TeacherSubject = sequelize.define(
    "TeacherSubject",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      teacher_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      subject_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
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
      tableName: "teacher_subjects",
    }
  );

  TeacherSubject.associate = function (models) {
    // pivot table — no further associations required here
  };

  return TeacherSubject;
};
