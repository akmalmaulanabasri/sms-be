"use strict";

module.exports = (sequelize, DataTypes) => {
  const StudentCard = sequelize.define(
    "StudentCard",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      student_id: { type: DataTypes.BIGINT, allowNull: false },
      card_uid: { type: DataTypes.STRING(100), allowNull: true },
      balance: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
      status: { type: DataTypes.STRING(20), allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "student_cards" }
  );

  StudentCard.associate = function (models) {
    StudentCard.belongsTo(models.Student, { foreignKey: "student_id" });
    StudentCard.hasMany(models.CardTransaction, { foreignKey: "card_id" });
  };

  return StudentCard;
};
