// seeders/20230427000001-demo-category.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Technology',
        slug: 'technology',
        description: 'All things related to technology',
        created_at: new Date(),
      },
      {
        name: 'Lifestyle',
        slug: 'lifestyle',
        description: 'Tips and advice on lifestyle',
        created_at: new Date(),
      },
      {
        name: 'Health',
        slug: 'health',
        description: 'Health and wellness topics',
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
