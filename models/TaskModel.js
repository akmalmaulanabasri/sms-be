"use strict";

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      subject_id: { type: DataTypes.BIGINT, allowNull: true },
      class_id: { type: DataTypes.BIGINT, allowNull: true },
      title: { type: DataTypes.STRING(200), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      deadline: { type: DataTypes.DATE, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "tasks" }
  );

  Task.associate = function (models) {
    Task.belongsTo(models.Subject, { foreignKey: "subject_id" });
    Task.belongsTo(models.Classroom, { foreignKey: "class_id" });
  };

  return Task;
};
