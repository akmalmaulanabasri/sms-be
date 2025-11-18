"use strict";

module.exports = (sequelize, DataTypes) => {
  const LearningMaterial = sequelize.define(
    "LearningMaterial",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      subject_id: { type: DataTypes.BIGINT, allowNull: false },
      title: { type: DataTypes.STRING(200), allowNull: false },
      file_url: { type: DataTypes.TEXT, allowNull: true },
      type: { type: DataTypes.STRING(20), allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "learning_materials" }
  );

  LearningMaterial.associate = function (models) {
    LearningMaterial.belongsTo(models.Subject, { foreignKey: "subject_id" });
  };

  return LearningMaterial;
};
