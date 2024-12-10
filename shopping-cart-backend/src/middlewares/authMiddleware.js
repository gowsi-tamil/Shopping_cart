const { verifyToken } = require('../config/jwt');

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  console.error(token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  
  try {
    // Attempt to verify the token using the helper function
    console.error('veridutoken');

    const decoded = verifyToken(token);
    console.log(decoded);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please log in again.',
      });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please log in again.',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid token. Please check and try again.',
    });
  }
};
