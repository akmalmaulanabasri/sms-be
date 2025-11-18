"use strict";

module.exports = (sequelize, DataTypes) => {
  const TaskSubmission = sequelize.define(
    "TaskSubmission",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      task_id: { type: DataTypes.BIGINT, allowNull: false },
      student_id: { type: DataTypes.BIGINT, allowNull: false },
      file_url: { type: DataTypes.TEXT, allowNull: true },
      submitted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      score: { type: DataTypes.INTEGER, allowNull: true },
      feedback: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "task_submissions" }
  );

  TaskSubmission.associate = function (models) {
    TaskSubmission.belongsTo(models.Task, { foreignKey: "task_id" });
    TaskSubmission.belongsTo(models.Student, { foreignKey: "student_id" });
  };

  return TaskSubmission;
};
