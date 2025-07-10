const { validationResult } = require('express-validator');
const { Exception } = require('../utils/Exception');

// Middleware for handling validation results from express-validator
const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const response = {
            success: false,
            message: 'Validation failed',
            exception: {
                message: errors.array().map(error => error.msg).join(', ')
            }
        };
        return res.status(400).json(response); // Respond with validation errors
    }

    next(); // If validation passed, continue to the next middleware/route handler
};

module.exports = { validate };
