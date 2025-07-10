'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('comments', [
      {
        project_id: 1,
        user_id: 1,
        parent_id: null,
        content: 'Great progress on the irrigation project!',
        created_at: new Date()
      },
      {
        project_id: 1,
        user_id: 2,
        parent_id: 1,
        content: 'Thanks mentor! Working on the next module.',
        created_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
