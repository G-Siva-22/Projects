const { AuthConstants } = require("../constants/AuthConstants");
const { HttpStatusCodeConstants } = require("../constants/HttpStatusCodeConstants");

const checkUserIdMatch = (req, res, next) => {
  const userIdFromToken = req.decodedUser.userId;
  const userIdFromRequest = req.body.userId || req.params.userId;

  // Compare user IDs
  if (userIdFromToken !== parseInt(userIdFromRequest, 10)) {
    const err = new Error(AuthConstants.UserMismatch);
    err.statusCode = HttpStatusCodeConstants.Forbidden;
    next(err);
    return;
  }
  next();
};

module.exports = checkUserIdMatch;
