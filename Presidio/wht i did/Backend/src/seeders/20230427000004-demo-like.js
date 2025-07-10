// seeders/20230427000004-demo-like.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('likes', [
      {
        post_id: 1, // Reference to the post (The Future of AI)
        user_id: 3, // Reference to the user (Jane Doe)
        liked_at: new Date(),
      },
      {
        post_id: 2, // Reference to the post (Healthy Living Tips)
        user_id: 1, // Reference to the user (Admin)
        liked_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('likes', null, {});
  },
};
