// src/models/ProjectUpdate.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ProjectUpdate', {
    project_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'project_updates',
    timestamps: false
  });
};
