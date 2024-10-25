const jwt = require('jsonwebtoken');

// Middleware to protect routes
exports.protect = (req, res, next) => {
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token found in cookies' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId }; 
    console.log('Authenticated user ID:', req.user.id);
    next();
  } catch (err) {
    console.error('Token verification error:', err); 
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};