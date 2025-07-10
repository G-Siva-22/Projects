// utils/responseHelper.js
const HttpStatusCodeConstants = require('../constants/HttpStatusCodeConstants');

// Function to send a success response
const sendSuccessResponse = (res, data, message = 'Request was successful', statusCode = HttpStatusCodeConstants.OK) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Function to send an error response
const sendErrorResponse = (res, error, message = 'An error occurred', statusCode = HttpStatusCodeConstants.INTERNAL_SERVER_ERROR) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

module.exports = { sendSuccessResponse, sendErrorResponse };
