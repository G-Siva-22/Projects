'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('project_team', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      project_id: { type: Sequelize.INTEGER, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      role: { type: Sequelize.ENUM('leader', 'member'), defaultValue: 'member' },
      joined_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('project_team');
  }
};
