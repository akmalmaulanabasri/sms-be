"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "teachers",
      [
        {
          nip: "19871234",
          name: "Ahmad Fauzi",
          email: "ahmad.fauzi@school.test",
          phone: "081234567890",
          gender: "M",
          address: "Jl. Merdeka No.1",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nip: "19874567",
          name: "Siti Aminah",
          email: "siti.aminah@school.test",
          phone: "081298765432",
          gender: "F",
          address: "Jl. Sudirman No.2",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("teachers", null, {});
  },
};
