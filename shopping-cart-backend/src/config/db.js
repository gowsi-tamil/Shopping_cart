require('dotenv').config(); // Load .env variables at the top of the file

const { Sequelize } = require('sequelize');

// Parse DB_HOST to extract connection information
const connectionString = process.env.DB_HOST;

const sequelize = new Sequelize(connectionString, {
  dialect: 'mysql', // Explicitly set the dialect
  logging: false, // Disable Sequelize logs
});

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1); // Exit process if connection fails
  });

module.exports = sequelize;
