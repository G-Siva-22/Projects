const { check } = require('express-validator');

// Custom validation functions for different inputs

// Validate if email is valid
const validateEmail = check('email')
    .isEmail()
    .withMessage('Please provide a valid email address');

// Validate if password is strong (min 8 chars, at least one number, one letter)
const validatePassword = check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[A-Za-z]/)
    .withMessage('Password must contain at least one letter');

// Validate if name is not empty and contains only alphabets
const validateName = check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isAlpha()
    .withMessage('Name should contain only letters');

// Custom email validation with domain check (for college emails)
const validateCollegeEmail = check('email')
    .matches(/@msec\.edu\.in$/)
    .withMessage('Please use a valid college email address (example@msec.edu.in)');

module.exports = { validateEmail, validatePassword, validateName, validateCollegeEmail };
