"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "classes",
      [
        {
          name: "7A",
          grade: 7,
          homeroom_teacher_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "7B",
          grade: 7,
          homeroom_teacher_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("classes", null, {});
  },
};
