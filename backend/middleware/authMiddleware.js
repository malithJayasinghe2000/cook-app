const jwt = require('jsonwebtoken');

// Middleware to protect routes
exports.protect = (req, res, next) => {
  const token = req.cookies.token; // Read token from cookies

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token found in cookies' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId }; // Ensure payload is being assigned correctly
    console.log('Authenticated user ID:', req.user.id); // Log user ID for debugging
    next();
  } catch (err) {
    console.error('Token verification error:', err); // Log error details
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};