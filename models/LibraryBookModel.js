"use strict";

module.exports = (sequelize, DataTypes) => {
  const LibraryBook = sequelize.define(
    "LibraryBook",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING(200), allowNull: false },
      author: { type: DataTypes.STRING(200), allowNull: true },
      stock: { type: DataTypes.INTEGER, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { underscored: true, tableName: "library_books" }
  );

  return LibraryBook;
};
