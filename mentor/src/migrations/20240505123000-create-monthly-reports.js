'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('monthly_reports', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      project_id: { type: Sequelize.INTEGER, allowNull: false },
      report_date: { type: Sequelize.STRING, allowNull: false }, // e.g., '2025-05'
      content: { type: Sequelize.TEXT },
      generated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('monthly_reports');
  }
};
