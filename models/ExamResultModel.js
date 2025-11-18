"use strict";

module.exports = (sequelize, DataTypes) => {
  const ExamResult = sequelize.define(
    "ExamResult",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      session_id: { type: DataTypes.BIGINT, allowNull: false },
      score: { type: DataTypes.INTEGER, allowNull: true },
      correct: { type: DataTypes.INTEGER, allowNull: true },
      wrong: { type: DataTypes.INTEGER, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "exam_results" }
  );

  ExamResult.associate = function (models) {
    ExamResult.belongsTo(models.ExamSession, { foreignKey: "session_id" });
  };

  return ExamResult;
};
