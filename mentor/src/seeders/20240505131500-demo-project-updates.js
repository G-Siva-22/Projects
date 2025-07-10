'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('project_updates', [
      {
        project_id: 1,
        user_id: 2,
        content: 'Initial sensor testing completed.',
        created_at: new Date()
      },
      {
        project_id: 2,
        user_id: 3,
        content: 'Chatbot model integrated with UI.',
        created_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('project_updates', null, {});
  }
};
