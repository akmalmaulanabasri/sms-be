"use strict";

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      nis: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      nisn: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      class_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      parent_id: {
        type: DataTypes.BIGINT,
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
      tableName: "students",
    }
  );

  Student.associate = function (models) {
    Student.belongsTo(models.Classroom, {
      foreignKey: "class_id",
      as: "class",
    });
  };

  return Student;
};
