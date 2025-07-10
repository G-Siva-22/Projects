const { body } = require('express-validator');

exports.registerValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Invalid email format')
    .matches(/@msec\.edu\.in$/).withMessage('Only college email allowed'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

exports.loginValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required')
];
