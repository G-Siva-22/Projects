'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      project_id: { type: Sequelize.INTEGER, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      parent_id: { type: Sequelize.INTEGER, allowNull: true },
      content: { type: Sequelize.TEXT, allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('comments');
  }
};
