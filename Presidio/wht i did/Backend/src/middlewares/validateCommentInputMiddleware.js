const { body, validationResult } = require('express-validator');
const { HttpStatusCodeConstants } = require("../constants/HttpStatusCodeConstants");

const validateCommentInput = [
  body('content').notEmpty().withMessage('Content is required for the comment'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCodeConstants.BadRequest).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateCommentInput };
