"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // insert subjects without teacher_id (we will populate pivot table below)
    await queryInterface.bulkInsert(
      "subjects",
      [
        {
          name: "Matematika",
          grade: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Bahasa Indonesia",
          grade: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    // link subjects to teachers in the pivot table (teachers seeded by previous seeder)
    // find teacher ids by email (seeder created these teachers earlier)
    const [[t1]] = await queryInterface.sequelize.query(
      `SELECT id FROM teachers WHERE email = 'ahmad.fauzi@school.test' LIMIT 1`
    );
    const [[t2]] = await queryInterface.sequelize.query(
      `SELECT id FROM teachers WHERE email = 'siti.aminah@school.test' LIMIT 1`
    );
    const [[s1]] = await queryInterface.sequelize.query(
      `SELECT id FROM subjects WHERE name = 'Matematika' LIMIT 1`
    );
    const [[s2]] = await queryInterface.sequelize.query(
      `SELECT id FROM subjects WHERE name = 'Bahasa Indonesia' LIMIT 1`
    );

    const entries = [];
    if (t1 && s1)
      entries.push({
        teacher_id: t1.id,
        subject_id: s1.id,
        created_at: new Date(),
        updated_at: new Date(),
      });
    if (t2 && s2)
      entries.push({
        teacher_id: t2.id,
        subject_id: s2.id,
        created_at: new Date(),
        updated_at: new Date(),
      });

    if (entries.length) {
      await queryInterface.bulkInsert("teacher_subjects", entries, {});
    }
    return;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("subjects", null, {});
  },
};
