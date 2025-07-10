const express = require('express');
const { requestJoinProject, handleJoinRequest } = require('../handlers/joinRequestHandler');
const { authenticate } = require('../../middlewares/authMiddleware');

const router = express.Router();

// Route to request to join a project
router.post('/projects/:projectId/join', authenticate, requestJoinProject);

// Route to approve or reject join requests (only mentors can do this)
router.patch('/join-requests/:joinRequestId', authenticate, handleJoinRequest);

module.exports = router;
