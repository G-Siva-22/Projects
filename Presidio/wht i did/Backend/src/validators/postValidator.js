// validators/postValidator.js
const { validateNotEmpty } = require('../utils/validation');
const { HttpStatusCodeConstants } = require('../constants/HttpStatusCodeConstants');
const { sendErrorResponse } = require('../utils/responseHelper');

// Validate create post input
const validateCreatePost = (req, res, next) => {
  const { title, content, category_id } = req.body;

  if (!validateNotEmpty(title)) {
    return sendErrorResponse(res, null, 'Title is required', HttpStatusCodeConstants.BAD_REQUEST);
  }

  if (!validateNotEmpty(content)) {
    return sendErrorResponse(res, null, 'Content is required', HttpStatusCodeConstants.BAD_REQUEST);
  }

  if (!category_id || isNaN(category_id)) {
    return sendErrorResponse(res, null, 'Valid category ID is required', HttpStatusCodeConstants.BAD_REQUEST);
  }

  next();
};

// Validate update post input
const validateUpdatePost = (req, res, next) => {
  const { title, content, category_id } = req.body;

  if (title && !validateNotEmpty(title)) {
    return sendErrorResponse(res, null, 'Title is required', HttpStatusCodeConstants.BAD_REQUEST);
  }

  if (content && !validateNotEmpty(content)) {
    return sendErrorResponse(res, null, 'Content is required', HttpStatusCodeConstants.BAD_REQUEST);
  }

  if (category_id && isNaN(category_id)) {
    return sendErrorResponse(res, null, 'Valid category ID is required', HttpStatusCodeConstants.BAD_REQUEST);
  }

  next();
};

module.exports = { validateCreatePost, validateUpdatePost };
