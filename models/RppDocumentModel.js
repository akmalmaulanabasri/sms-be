"use strict";

module.exports = (sequelize, DataTypes) => {
  const RppDocument = sequelize.define(
    "RppDocument",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      subject_id: { type: DataTypes.BIGINT, allowNull: false },
      file_url: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "rpp_documents" }
  );

  RppDocument.associate = function (models) {
    RppDocument.belongsTo(models.Subject, { foreignKey: "subject_id" });
  };

  return RppDocument;
};
