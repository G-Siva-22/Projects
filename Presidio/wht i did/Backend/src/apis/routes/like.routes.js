const express = require('express');
const router = express.Router();
const { like } = require('../../models');


router.post('/', async (req, res) => {
  try {
    const like = await Like.create(req.body);
    res.json(like);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const likes = await Like.findAll();
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
