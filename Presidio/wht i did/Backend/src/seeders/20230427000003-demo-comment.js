// seeders/20230427000003-demo-comment.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('comments', [
      {
        post_id: 1, // Reference to the post (The Future of AI)
        user_id: 2, // Reference to the user (John Doe)
        content: 'This is a very interesting article about AI!',
        created_at: new Date(),
        is_approved: true,
      },
      {
        post_id: 2, // Reference to the post (Healthy Living Tips)
        user_id: 3, // Reference to the user (Jane Doe)
        content: 'Great tips! I will start following them.',
        created_at: new Date(),
        is_approved: true,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
