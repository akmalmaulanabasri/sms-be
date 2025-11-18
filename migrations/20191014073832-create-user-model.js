"use strict";
module.exports = {
  // eslint-disable-next-line
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        defaultValue: "",
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: "",
        allowNull: false,
        unique: true,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "admin",
        allowNull: false,
        unique: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
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
    await queryInterface.dropTable("users");
  },
};
