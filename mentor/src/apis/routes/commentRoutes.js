const express = require("express");
const { createComment, deleteComment } = require("../handlers/commentHandler");
const { authenticate } = require("../../middlewares/authMiddleware");

const router = express.Router();

// Route to create a new comment
router.post("/projects/:projectId/comments", authenticate, createComment);

// Route to delete a comment
router.delete("/projects/:projectId/comments/:commentId", authenticate, deleteComment);

module.exports = router;
