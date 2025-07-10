const  express  = require("express");
const { getProjectStats } = require("../handlers/projectStatsHandler");
const { authenticate } = require("../../middlewares/authMiddleware");

const router = express.Router();

// Route to get all project stats
router.get("/project-stats", authenticate, getProjectStats);

// Route to get project stats by project ID
router.get("/projects/:projectId/stats", authenticate, getProjectStats);

// Route to get project stats by user ID
router.get("/users/:userId/stats", authenticate, getProjectStats);

// Route to get project stats by team ID
router.get("/teams/:teamId/stats", authenticate, getProjectStats);

// Route to get project stats by date range
router.get("/projects/:projectId/stats/date-range", authenticate, getProjectStats);

// Route to get project stats by status
router.get("/projects/:projectId/stats/status", authenticate, getProjectStats);

// Route to get project stats by category
router.get("/projects/:projectId/stats/category", authenticate, getProjectStats);

module.exports = router;