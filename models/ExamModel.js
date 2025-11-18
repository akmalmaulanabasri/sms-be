"use strict";

module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define(
    "Exam",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      subject_id: { type: DataTypes.BIGINT, allowNull: false },
      class_id: { type: DataTypes.BIGINT, allowNull: false },
      title: { type: DataTypes.STRING(200), allowNull: false },
      duration: { type: DataTypes.INTEGER, allowNull: true },
      date: { type: DataTypes.DATE, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "exams" }
  );

  Exam.associate = function (models) {
    Exam.belongsTo(models.Subject, { foreignKey: "subject_id" });
    Exam.belongsTo(models.Classroom, { foreignKey: "class_id" });
  };

  return Exam;
};
