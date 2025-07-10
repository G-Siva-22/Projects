// src/apis/routes/index.js

const express = require('express');
const router = express.Router();

// Import route files
const userRoutes = require('./user.routes');
const postRoutes = require('./post.routes');
const commentRoutes = require('./comment.routes');
const likeRoutes = require('./like.routes');
const savedPostRoutes = require('./savedPost.routes');
const categoryRoutes = require('./category.routes');

// Mount all routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/likes', likeRoutes);
router.use('/saved-posts', savedPostRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
