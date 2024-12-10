const jwt = require('jsonwebtoken');

// Secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Generate a JWT token
const generateToken = (payload) => {
  try {
    console.log('Generating token');

    // Add timestamp or any dynamic info to ensure unique token generation
    const tokenPayload = {
      ...payload, // Include existing user information
      //iat: Math.floor(Date.now() / 1000), // Add issued at timestamp (current time)
    };

    let token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '500h' }); // Token valid for 500 hours
    return token;
  } catch (error) {
    console.error('Token generation failed', error);
    throw new Error('Token generation failed');
  }
};

// Verify a JWT token
const verifyToken = (token) => {
  try {
    console.log('Verifying token');

    let decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.log(error);
    throw new Error('Invalid or expired token');
  }
};

module.exports = { generateToken, verifyToken };
