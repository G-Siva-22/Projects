'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('join_requests', [
      {
        project_id: 2,
        user_id: 2,
        status: 'pending',
        message: 'Interested in working on chatbot UI.',
        created_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('join_requests', null, {});
  }
};
