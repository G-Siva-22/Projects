// src/models/Project.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Project', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    created_by_id: { type: DataTypes.INTEGER, allowNull: false },
    mentor_id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.ENUM('active', 'completed'), defaultValue: 'active' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'projects',
    timestamps: false
  });
};
