const { Post } = require('../models');
const { AuthConstants } = require("../constants/AuthConstants");
const { HttpStatusCodeConstants } = require("../constants/HttpStatusCodeConstants");

const checkPostOwner = async (req, res, next) => {
  const postId = req.params.post_id;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      const error = new Error(AuthConstants.PostNotFound);
      error.statusCode = HttpStatusCodeConstants.NotFound;
      return next(error);
    }

    // Check if the current user is the owner of the post
    if (post.author_id !== req.decodedUser.userId) {
      const err = new Error(AuthConstants.UnauthorizedAccess);
      err.statusCode = HttpStatusCodeConstants.Forbidden;
      return next(err);
    }

    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    const error = new Error(AuthConstants.ErrorCheckingPostOwner);
    error.statusCode = HttpStatusCodeConstants.InternalServerError;
    next(error);
  }
};

module.exports = checkPostOwner;
