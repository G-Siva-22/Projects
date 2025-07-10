'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('project_stats', [
      {
        project_id: 1,
        comments_count: 2,
        team_size: 2,
        update_count: 1,
        last_updated: new Date()
      },
      {
        project_id: 2,
        comments_count: 0,
        team_size: 1,
        update_count: 1,
        last_updated: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('project_stats', null, {});
  }
};
