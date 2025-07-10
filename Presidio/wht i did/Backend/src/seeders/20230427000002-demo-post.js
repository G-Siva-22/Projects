// seeders/20230427000002-demo-post.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('posts', [
      {
        author_id: 1, // Reference to the user (Admin)
        title: 'The Future of AI',
        slug: 'the-future-of-ai',
        content: 'AI is revolutionizing various fields like healthcare, finance, and more...',
        excerpt: 'AI is revolutionizing various fields...',
        thumbnail: 'ai-thumbnail.jpg',
        status: 'published',
        published_at: new Date(),
        is_featured: true,
        view_count: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        author_id: 2, // Reference to the user (John Doe)
        title: 'Healthy Living Tips',
        slug: 'healthy-living-tips',
        content: 'To live a healthy life, exercise and a balanced diet are crucial...',
        excerpt: 'Exercise and a balanced diet are crucial...',
        thumbnail: 'healthy-living-thumbnail.jpg',
        status: 'published',
        published_at: new Date(),
        is_featured: false,
        view_count: 30,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('posts', null, {});
  },
};
