"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable("classes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      grade: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      homeroom_teacher_id: {
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
    await queryInterface.dropTable("classes");
  },
};
