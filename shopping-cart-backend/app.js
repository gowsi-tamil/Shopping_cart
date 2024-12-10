const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/db');
const { errorMiddleware } = require('./src/middlewares/errorMiddleware');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./src/routes/authRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const productRoutes = require('./src/routes/productRoutes');

app.use('/api/auth', authRoutes);          // Auth routes
app.use('/api/cart', cartRoutes);          // Cart routes
app.use('/api/products', productRoutes);  // Product routes

// Error handling middleware
app.use(errorMiddleware);

// Test DB connection
sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Error connecting to the database:', err));

module.exports = app;
