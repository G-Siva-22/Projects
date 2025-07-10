'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('password123', 10);
    await queryInterface.bulkInsert('users', [
      {
        name: 'Alice Mentor',
        email: 'alice@msec.edu.in',
        password_hash: password,
        role: 'mentor',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Bob Student',
        email: 'bob3115@msec.edu.in',
        password_hash: password,
        role: 'student',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Charlie Student',
        email: 'charlie3115@msec.edu.in',
        password_hash: password,
        role: 'student',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
