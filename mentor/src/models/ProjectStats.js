// src/models/ProjectStats.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ProjectStats', {
    project_id: { type: DataTypes.INTEGER, primaryKey: true },
    comments_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    team_size: { type: DataTypes.INTEGER, defaultValue: 0 },
    update_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    last_updated: { type: DataTypes.DATE }
  }, {
    tableName: 'project_stats',
    timestamps: false
  });
};
