// src/models/JoinRequest.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('JoinRequest', {
    project_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
    message: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'join_requests',
    timestamps: false
  });
};
