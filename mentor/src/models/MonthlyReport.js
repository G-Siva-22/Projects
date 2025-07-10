// src/models/MonthlyReport.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('MonthlyReport', {
    project_id: { type: DataTypes.INTEGER, allowNull: false },
    report_date: { type: DataTypes.STRING, allowNull: false }, // e.g., '2025-05'
    content: { type: DataTypes.TEXT },
    generated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'monthly_reports',
    timestamps: false
  });
};
