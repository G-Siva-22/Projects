'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('project_team', [
      { project_id: 1, user_id: 2, role: 'leader', joined_at: new Date() },
      { project_id: 1, user_id: 3, role: 'member', joined_at: new Date() },
      { project_id: 2, user_id: 3, role: 'leader', joined_at: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('project_team', null, {});
  }
};
