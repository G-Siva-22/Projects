const { Sequelize } = require('sequelize');
require('dotenv').config();  // Ensures .env is loaded properly




// Verify that all environment variables are loaded correctly
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Set to true if you want to see SQL queries
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    // Print more details if there's an issue
    if (error.original) {
      console.error('Error details:', error.original);
    }
  }
};

connect();

// Exporting sequelize directly for use elsewhere in the app
module.exports = sequelize;
