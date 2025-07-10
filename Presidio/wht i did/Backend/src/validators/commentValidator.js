// validators/commentValidator.js
const { validateNotEmpty } = require('../utils/validation');
const { HttpStatusCodeConstants } = require('../constants/HttpStatusCodeConstants');
const { sendErrorResponse } = require('../utils/responseHelper');

// Validate create comment input
const validateCreateComment = (req, res, next) => {
  const { content } = req.body;

  if (!validateNotEmpty(content)) {
    return sendErrorResponse(res, null, 'Content is required', HttpStatusCodeConstants.BAD_REQUEST);
  }

  next();
};

module.exports = { validateCreateComment };
