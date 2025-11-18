"use strict";

module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define(
    "Grade",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      student_id: { type: DataTypes.BIGINT, allowNull: false },
      subject_id: { type: DataTypes.BIGINT, allowNull: false },
      type: { type: DataTypes.STRING(20), allowNull: true },
      score: { type: DataTypes.FLOAT, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "grades" }
  );

  Grade.associate = function (models) {
    Grade.belongsTo(models.Student, { foreignKey: "student_id" });
    Grade.belongsTo(models.Subject, { foreignKey: "subject_id" });
  };

  return Grade;
};
