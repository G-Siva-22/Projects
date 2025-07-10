'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      post_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author_id: Sequelize.INTEGER,
      title: Sequelize.STRING,
      slug: Sequelize.STRING,
      content: Sequelize.TEXT,
      excerpt: Sequelize.STRING,
      thumbnail: Sequelize.STRING,
      status: {
        type: Sequelize.ENUM('draft', 'published'),
        defaultValue: 'draft'
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      published_at: Sequelize.DATE,
      is_featured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      view_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};

