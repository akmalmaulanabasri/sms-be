"use strict";

module.exports = (sequelize, DataTypes) => {
  const QuestionBank = sequelize.define(
    "QuestionBank",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      subject_id: { type: DataTypes.BIGINT, allowNull: false },
      title: { type: DataTypes.STRING(200), allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "question_banks" }
  );

  QuestionBank.associate = function (models) {
    QuestionBank.belongsTo(models.Subject, { foreignKey: "subject_id" });
  };

  return QuestionBank;
};
