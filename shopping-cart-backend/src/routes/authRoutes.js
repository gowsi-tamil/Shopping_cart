const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateAuth } = require('../utils/validation');

const router = express.Router();

router.post('/register', validateAuth, register); // User registration
router.post('/login', validateAuth, login);      // User login

module.exports = router;
