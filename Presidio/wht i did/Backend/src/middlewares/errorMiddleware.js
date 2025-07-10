const { HttpStatusCodeConstants } = require("../constants/HttpStatusCodeConstants");

const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error for debugging

  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // For unexpected errors, send a generic server error
  res.status(HttpStatusCodeConstants.InternalServerError).json({ message: 'Internal server error' });
};

module.exports = errorHandler;
