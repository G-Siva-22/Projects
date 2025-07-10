// seeders/20230427000000-demo-user.js
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedAdminPassword = await bcrypt.hash('adminpassword', 10);
    const hashedJohnPassword = await bcrypt.hash('johnpassword', 10);
    const hashedJanePassword = await bcrypt.hash('janepassword', 10);

    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password_hash: hashedAdminPassword, // Hashed password
        full_name: 'Admin User',
        bio: 'Administrator of the platform',
        role: 'Admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'john_doe',
        email: 'john.doe@example.com',
        password_hash: hashedJohnPassword, // Hashed password
        full_name: 'John Doe',
        bio: 'A regular user',
        role: 'User',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'jane_doe',
        email: 'jane.doe@example.com',
        password_hash: hashedJanePassword, // Hashed password
        full_name: 'Jane Doe',
        bio: 'Another regular user',
        role: 'User',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
