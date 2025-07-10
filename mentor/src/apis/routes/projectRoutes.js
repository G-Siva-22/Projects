const express = require('express');
const {
  createProject,
  getProjects,
  getProject,
  updateProjectStatus
} = require('../handlers/projectHandler');

const { authenticate } = require('../../middlewares/authMiddleware');
const { isMentor } = require('../../middlewares/roleMiddleware');

const router = express.Router();

// Create a new project
router.post('/projects', authenticate, createProject);

// Get all active projects
router.get('/projects', authenticate, getProjects);

// Get a specific project by ID
router.get('/projects/:projectId', authenticate, getProject);

// Update project status (only mentors)
router.patch('/projects/:projectId/status', authenticate, isMentor, updateProjectStatus);

module.exports = router;
