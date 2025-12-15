const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Remove 'Bearer ' if present
    const actualToken = token.replace('Bearer ', '');
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;