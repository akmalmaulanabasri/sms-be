"use strict";

module.exports = (sequelize, DataTypes) => {
  const LibraryLoan = sequelize.define(
    "LibraryLoan",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      book_id: { type: DataTypes.BIGINT, allowNull: false },
      student_id: { type: DataTypes.BIGINT, allowNull: false },
      loan_date: { type: DataTypes.DATEONLY, allowNull: true },
      return_date: { type: DataTypes.DATEONLY, allowNull: true },
      due_date: { type: DataTypes.DATEONLY, allowNull: true },
      status: { type: DataTypes.STRING(20), allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "library_loans" }
  );

  LibraryLoan.associate = function (models) {
    LibraryLoan.belongsTo(models.LibraryBook, { foreignKey: "book_id" });
    LibraryLoan.belongsTo(models.Student, { foreignKey: "student_id" });
  };

  return LibraryLoan;
};
