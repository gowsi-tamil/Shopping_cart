const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/jwt');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  console.log(req);
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Email and password are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res
      .status(201)
      .json({ success: true, data: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Email and password are required' });
    }


    
    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken({ id: user.id });
    res.status(200).json({ success: true, token, id: user.id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
