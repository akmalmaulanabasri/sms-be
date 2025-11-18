"use strict";

module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    "Report",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      student_id: { type: DataTypes.BIGINT, allowNull: false },
      semester: { type: DataTypes.STRING(20), allowNull: true },
      file_url: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "reports" }
  );

  Report.associate = function (models) {
    Report.belongsTo(models.Student, { foreignKey: "student_id" });
  };

  return Report;
};
