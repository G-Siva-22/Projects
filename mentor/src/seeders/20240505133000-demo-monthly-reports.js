'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('monthly_reports', [
      {
        project_id: 1,
        report_date: '2025-04',
        content: 'Soil sensor and pump control module completed.',
        generated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('monthly_reports', null, {});
  }
};
