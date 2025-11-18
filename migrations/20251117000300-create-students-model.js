"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable("students", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      nis: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      nisn: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING(2),
        allowNull: true,
      },
      class_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      parent_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    }),
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("students");
  },
};
