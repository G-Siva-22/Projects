const { body } = require('express-validator');

exports.createProjectValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('mentorId').isInt().withMessage('Valid mentor ID is required')
];
