const { AuthConstants } = require("../constants/AuthConstants");
const { HttpStatusCodeConstants } = require("../constants/HttpStatusCodeConstants");

const isAdmin = (req, res, next) => {
  if (req.decodedUser.role !== 'Admin') {
    const err = new Error(AuthConstants.AdminOnly);
    err.statusCode = HttpStatusCodeConstants.Forbidden;
    next(err);
    return;
  }
  next();
};

module.exports = { isAdmin };
