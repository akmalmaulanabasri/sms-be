"use strict";

module.exports = (sequelize, DataTypes) => {
  const Classroom = sequelize.define(
    "Classroom",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      grade: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      homeroom_teacher_id: {
        type: DataTypes.BIGINT,
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
      tableName: "classes",
    }
  );

  Classroom.associate = function (models) {
    Classroom.belongsTo(models.Teacher, {
      foreignKey: "homeroom_teacher_id",
      as: "homeroomTeacher",
    });
    Classroom.hasMany(models.Student, { foreignKey: "class_id" });
  };

  return Classroom;
};
