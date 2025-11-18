"use strict";

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      bank_id: { type: DataTypes.BIGINT, allowNull: false },
      question: { type: DataTypes.TEXT, allowNull: false },
      type: { type: DataTypes.STRING(20), allowNull: true },
      option_a: { type: DataTypes.TEXT, allowNull: true },
      option_b: { type: DataTypes.TEXT, allowNull: true },
      option_c: { type: DataTypes.TEXT, allowNull: true },
      option_d: { type: DataTypes.TEXT, allowNull: true },
      correct_option: { type: DataTypes.STRING(10), allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "questions" }
  );

  Question.associate = function (models) {
    Question.belongsTo(models.QuestionBank, { foreignKey: "bank_id" });
  };

  return Question;
};
