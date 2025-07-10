// seeders/20230427000005-demo-saved-post.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('saved_posts', [
      {
        user_id: 2, // Reference to the user (John Doe)
        post_id: 1, // Reference to the post (The Future of AI)
        saved_at: new Date(),
      },
      {
        user_id: 3, // Reference to the user (Jane Doe)
        post_id: 2, // Reference to the post (Healthy Living Tips)
        saved_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('saved_posts', null, {});
  },
};
