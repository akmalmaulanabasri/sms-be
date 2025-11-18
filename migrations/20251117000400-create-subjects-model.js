"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable("subjects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      grade: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      teacher_id: {
        type: Sequelize.BIGINT,
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
    await queryInterface.dropTable("subjects");
  },
};
