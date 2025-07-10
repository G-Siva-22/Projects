const { body, validationResult } = require('express-validator');
const { HttpStatusCodeConstants } = require("../constants/HttpStatusCodeConstants");

const validatePostInput = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').optional().isLength({ max: 150 }).withMessage('Excerpt can have a maximum length of 150 characters'),
  body('thumbnail').optional().isURL().withMessage('Thumbnail must be a valid URL'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCodeConstants.BadRequest).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validatePostInput };
