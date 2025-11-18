"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // noop migration to preserve ordering; real pivot migration is 20251117000500-create-teacher-subjects-table.js
    return Promise.resolve();
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.resolve();
  },
};
