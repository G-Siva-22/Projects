const express = require('express');
const router = express.Router();
const { savedPost } = require('../../models');


router.post('/', async (req, res) => {
  try {
    const savedPost = await SavedPost.create(req.body);
    res.json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const savedPosts = await SavedPost.findAll();
    res.json(savedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
