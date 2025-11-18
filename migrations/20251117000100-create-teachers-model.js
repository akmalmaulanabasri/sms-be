"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable("teachers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      nip: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING(2),
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
    await queryInterface.dropTable("teachers");
  },
};
