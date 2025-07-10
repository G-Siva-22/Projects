// seeders/index.js

const path = require('path');
const { sequelize } = require('../models');

// Run all seeders
const runSeeders = async () => {
  try {
    await sequelize.sync(); // Ensures all tables are created before seeding
    console.log('Database synchronized successfully.');
    // Run the seeders
    const seeders = [
      require('./20230427000000-demo-user'),
      require('./20230427000001-demo-category'),
      require('./20230427000002-demo-post'),
      require('./20230427000003-demo-comment'),
      require('./20230427000004-demo-like'),
      require('./20230427000005-demo-saved-post'),
    ];

    for (const seeder of seeders) {
      await seeder.up(sequelize.getQueryInterface(), sequelize.Sequelize);
    }

    console.log('Seeders executed successfully.');
  } catch (error) {
    console.error('Error running seeders: ', error);
  }
};

runSeeders();
