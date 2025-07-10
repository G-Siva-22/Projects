'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('join_requests', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      project_id: { type: Sequelize.INTEGER, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      status: { type: Sequelize.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
      message: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('join_requests');
  }
};
