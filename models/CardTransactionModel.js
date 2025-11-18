"use strict";

module.exports = (sequelize, DataTypes) => {
  const CardTransaction = sequelize.define(
    "CardTransaction",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      card_id: { type: DataTypes.BIGINT, allowNull: false },
      type: { type: DataTypes.STRING(20), allowNull: true },
      amount: { type: DataTypes.INTEGER, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "card_transactions" }
  );

  CardTransaction.associate = function (models) {
    CardTransaction.belongsTo(models.StudentCard, { foreignKey: "card_id" });
  };

  return CardTransaction;
};
