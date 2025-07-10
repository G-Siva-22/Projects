const { ErrorMessages } = require('../constants/errorMessages');

const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: ErrorMessages.ACCESS_DENIED });
    }

    next();
  };
};

const isMentor = allowRoles('mentor');

module.exports = {
  allowRoles,
  isMentor
};
