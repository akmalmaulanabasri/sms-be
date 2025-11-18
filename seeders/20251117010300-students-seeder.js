"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "students",
      [
        {
          nis: "10001",
          nisn: "010001",
          name: "Budi Santoso",
          gender: "M",
          class_id: 1,
          parent_id: null,
          address: "Jl. Kenanga 10",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nis: "10002",
          nisn: "010002",
          name: "Dewi Lestari",
          gender: "F",
          class_id: 1,
          parent_id: null,
          address: "Jl. Melati 5",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("students", null, {});
  },
};
