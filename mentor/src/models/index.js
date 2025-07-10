// src/models/index.js
const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const ProjectModel = require('./Project');
const ProjectTeamModel = require('./ProjectTeam');
const ProjectUpdateModel = require('./ProjectUpdate');
const CommentModel = require('./Comment');
const JoinRequestModel = require('./JoinRequest');
const MonthlyReportModel = require('./MonthlyReport');
const ProjectStatsModel = require('./ProjectStats');

const sequelize = require('../config/database'); // Ensure this points to your database configuration 

// Define models
const User = UserModel(sequelize);
const Project = ProjectModel(sequelize);
const ProjectTeam = ProjectTeamModel(sequelize);
const ProjectUpdate = ProjectUpdateModel(sequelize);
const Comment = CommentModel(sequelize);
const JoinRequest = JoinRequestModel(sequelize);
const MonthlyReport = MonthlyReportModel(sequelize);
const ProjectStats = ProjectStatsModel(sequelize);

// Associations
User.hasMany(Project, { foreignKey: 'created_by_id' });
User.hasMany(Project, { foreignKey: 'mentor_id' });
Project.belongsTo(User, { as: 'creator', foreignKey: 'created_by_id' });
Project.belongsTo(User, { as: 'mentor', foreignKey: 'mentor_id' });

Project.hasMany(ProjectTeam, { foreignKey: 'project_id' });
ProjectTeam.belongsTo(User, { foreignKey: 'user_id' });

Project.hasMany(ProjectUpdate, { foreignKey: 'project_id' });
ProjectUpdate.belongsTo(User, { foreignKey: 'user_id' });

Project.hasMany(Comment, { foreignKey: 'project_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Comment, { as: 'parent', foreignKey: 'parent_id' });

Project.hasMany(JoinRequest, { foreignKey: 'project_id' });
JoinRequest.belongsTo(User, { foreignKey: 'user_id' });

Project.hasMany(MonthlyReport, { foreignKey: 'project_id' });
Project.hasOne(ProjectStats, { foreignKey: 'project_id' });

// Export all models and Sequelize instance
module.exports = {
  sequelize,
  User,
  Project,
  ProjectTeam,
  ProjectUpdate,
  Comment,
  JoinRequest,
  MonthlyReport,
  ProjectStats,
};
