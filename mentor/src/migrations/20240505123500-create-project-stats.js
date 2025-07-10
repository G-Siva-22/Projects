'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('project_stats', {
      project_id: { type: Sequelize.INTEGER, primaryKey: true },
      comments_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      team_size: { type: Sequelize.INTEGER, defaultValue: 0 },
      update_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      last_updated: { type: Sequelize.DATE }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('project_stats');
  }
};
