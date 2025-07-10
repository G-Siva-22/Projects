// src/models/ProjectTeam.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ProjectTeam', {
    project_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    role: { type: DataTypes.ENUM('leader', 'member'), defaultValue: 'member' },
    joined_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'project_team',
    timestamps: false
  });
};
