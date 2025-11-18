"use strict";

module.exports = (sequelize, DataTypes) => {
  const Billing = sequelize.define(
    "Billing",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      student_id: { type: DataTypes.BIGINT, allowNull: false },
      month: { type: DataTypes.STRING(20), allowNull: true },
      amount: { type: DataTypes.INTEGER, allowNull: true },
      status: { type: DataTypes.STRING(20), allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "billings" }
  );

  Billing.associate = function (models) {
    Billing.belongsTo(models.Student, { foreignKey: "student_id" });
  };

  return Billing;
};
