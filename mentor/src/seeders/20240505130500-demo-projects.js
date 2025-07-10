'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('projects', [
      {
        title: 'Smart Irrigation System',
        description: 'IoT based smart irrigation system using sensors and Arduino.',
        created_by_id: 2,
        mentor_id: 1,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'AI Chatbot for College Helpdesk',
        description: 'A chatbot to assist students in navigating college services.',
        created_by_id: 3,
        mentor_id: 1,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('projects', null, {});
  }
};
