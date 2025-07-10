const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../handlers/userHandler');
const { authenticate } = require('../../middlewares/authMiddleware');

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in and get a JWT token
router.post('/login', loginUser);

// Route to get user profile (requires authentication)
router.get('/users/:userId', authenticate, getUserProfile);

module.exports = router;
