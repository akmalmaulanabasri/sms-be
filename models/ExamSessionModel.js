"use strict";

module.exports = (sequelize, DataTypes) => {
  const ExamSession = sequelize.define(
    "ExamSession",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      exam_id: { type: DataTypes.BIGINT, allowNull: false },
      student_id: { type: DataTypes.BIGINT, allowNull: false },
      started_at: { type: DataTypes.DATE, allowNull: true },
      finished_at: { type: DataTypes.DATE, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "exam_sessions" }
  );

  ExamSession.associate = function (models) {
    ExamSession.belongsTo(models.Exam, { foreignKey: "exam_id" });
    ExamSession.belongsTo(models.Student, { foreignKey: "student_id" });
  };

  return ExamSession;
};
