// validators/categoryValidator.js
const { validateNotEmpty } = require('../utils/validation');
const { HttpStatusCodeConstants } = require('../constants/HttpStatusCodeConstants');
const { sendErrorResponse } = require('../utils/responseHelper');

// Validate create category input
const validateCreateCategory = (req, res, next) => {
  const { name, description } = req.body;

  if (!validateNotEmpty(name)) {
    return sendErrorResponse(res, null, 'Category name is required', HttpStatusCodeConstants.BAD_REQUEST);
  }

  if (!validateNotEmpty(description)) {
    return sendErrorResponse(res, null, 'Category description is required', HttpStatusCodeConstants.BAD_REQUEST);
  }

  next();
};

// Validate update category input
const validateUpdateCategory = (req, res, next) => {
  const { name, description } = req.body;

  if (name && !validateNotEmpty(name)) {
    return sendErrorResponse(res, null, 'Category name is required', HttpStatusCodeConstants.BAD_REQUEST);
  }

  if (description && !validateNotEmpty(description)) {
    return sendErrorResponse(res, null, 'Category description is required', HttpStatusCodeConstants.BAD_REQUEST);
  }

  next();
};

module.exports = { validateCreateCategory, validateUpdateCategory };
