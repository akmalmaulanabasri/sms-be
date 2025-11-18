"use strict";

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      billing_id: { type: DataTypes.BIGINT, allowNull: false },
      method: { type: DataTypes.STRING(20), allowNull: true },
      proof_url: { type: DataTypes.TEXT, allowNull: true },
      amount: { type: DataTypes.INTEGER, allowNull: true },
      paid_at: { type: DataTypes.DATE, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "payments" }
  );

  Payment.associate = function (models) {
    Payment.belongsTo(models.Billing, { foreignKey: "billing_id" });
  };

  return Payment;
};
