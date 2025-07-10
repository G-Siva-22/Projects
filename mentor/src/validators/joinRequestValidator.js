const { body } = require('express-validator');

exports.joinRequestValidator = [
  body('projectId').isInt().withMessage('Valid project ID is required'),
  body('message').optional().isString().withMessage('Message must be text')
];
