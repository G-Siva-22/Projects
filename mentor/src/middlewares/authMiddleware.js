const jwt = require('jsonwebtoken');
const { Exception } = require('../utils/Exception');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
      exception: Exception
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Failed to authenticate token',
        exception: Exception
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { authenticate };
