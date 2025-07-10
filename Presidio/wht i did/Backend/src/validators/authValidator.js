// validators/authValidator.js
const { validateEmail, validatePassword, validateNotEmpty } = require('../utils/validation');
const { HttpStatusCodeConstants } = require('../constants/HttpStatusCodeConstants');
const { sendErrorResponse } = require('../utils/responseHelper');

// Validate user registration input
const validateRegisterInput = (req, res, next) => {
  const { username, email, password, full_name } = req.body;

  if (!validateNotEmpty(username) || !validateNotEmpty(full_name)) {
    return sendErrorResponse(res, null, 'Username and Full Name are required', HttpStatusCodeConstants.BAD_REQUEST);
  }

  if (!validateEmail(email)) {
    return sendErrorResponse(res, null, 'Invalid email format', HttpStatusCodeConstants.BAD_REQUEST);
  }

  if (!validatePassword(password)) {
    return sendErrorResponse(res, null, 'Password must be at least 8 characters long and contain both letters and numbers', HttpStatusCodeConstants.BAD_REQUEST);
  }

  next();
};

// Validate user login input
const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    return sendErrorResponse(res, null, 'Invalid email format', HttpStatusCodeConstants.BAD_REQUEST);
  }

  if (!validateNotEmpty(password)) {
    return sendErrorResponse(res, null, 'Password is required', HttpStatusCodeConstants.BAD_REQUEST);
  }

  next();
};

module.exports = { validateRegisterInput, validateLoginInput };
