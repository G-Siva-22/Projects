const jwt = require('jsonwebtoken');
const { AuthConstants } = require("../constants/AuthConstants");
const { HttpStatusCodeConstants } = require("../constants/HttpStatusCodeConstants");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    const error = new Error(AuthConstants.TokenNotFound);
    error.statusCode = HttpStatusCodeConstants.Unauthorized;
    next(error);
    return;
  }

  try {
    const decodedPayload = jwt.verify(token, JWT_SECRET);
    req.decodedUser = decodedPayload;
    next();
  } catch (error) {
    console.error(`Error while decoding token - ${error}`);
    const err = new Error(AuthConstants.InvalidOrExpiredToken);
    err.statusCode = HttpStatusCodeConstants.Unauthorized;
    next(err);
  }
};

module.exports = { verifyToken };
