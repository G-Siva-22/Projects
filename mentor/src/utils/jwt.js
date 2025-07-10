const jwt = require('jsonwebtoken');
require('dotenv').config();
// Generate JWT token with user data
const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        role: user.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '1h'
    });
};

// Verify JWT token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = { generateToken, verifyToken };
