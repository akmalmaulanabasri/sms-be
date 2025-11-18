"use strict";

module.exports = (sequelize, DataTypes) => {
  const Syllabus = sequelize.define(
    "Syllabus",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      subject_id: { type: DataTypes.BIGINT, allowNull: false },
      file_url: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "syllabus" }
  );

  Syllabus.associate = function (models) {
    Syllabus.belongsTo(models.Subject, { foreignKey: "subject_id" });
  };

  return Syllabus;
};
