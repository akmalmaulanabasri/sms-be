"use strict";

module.exports = (sequelize, DataTypes) => {
  const CurriculumCompetency = sequelize.define(
    "CurriculumCompetency",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      curriculum_id: { type: DataTypes.BIGINT, allowNull: false },
      code: { type: DataTypes.STRING(50), allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "curriculum_competencies" }
  );

  CurriculumCompetency.associate = function (models) {
    CurriculumCompetency.belongsTo(models.Curriculum, {
      foreignKey: "curriculum_id",
    });
  };

  return CurriculumCompetency;
};
