"use strict";

module.exports = (sequelize, DataTypes) => {
  const Curriculum = sequelize.define(
    "Curriculum",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(150), allowNull: false },
      level: { type: DataTypes.STRING(20), allowNull: true },
      year: { type: DataTypes.INTEGER, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "curriculums" }
  );

  Curriculum.associate = function (models) {
    Curriculum.hasMany(models.CurriculumCompetency, {
      foreignKey: "curriculum_id",
    });
  };

  return Curriculum;
};
