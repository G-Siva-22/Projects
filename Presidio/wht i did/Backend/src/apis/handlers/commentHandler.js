// apis/handlers/commentHandler.js
const { Comment, Post, User } = require('../../models');
const { HttpStatusCodeConstants } = require('../../constants/HttpStatusCodeConstants');
const { sendErrorResponse } = require('../../utils/responseHelper');

const createComment = async (req, res) => {
  const { postId, content } = req.body;

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return sendErrorResponse(res, null, 'Post not found', HttpStatusCodeConstants.NOT_FOUND);
    }

    const comment = await Comment.create({
      post_id: postId,
      user_id: req.decodedUser.userId,
      content,
    });

    res.status(HttpStatusCodeConstants.CREATED).json(comment);
  } catch (error) {
    sendErrorResponse(res, error, 'Error creating comment', HttpStatusCodeConstants.INTERNAL_SERVER_ERROR);
  }
};

const approveComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findOne({ where: { comment_id: commentId } });

    if (!comment) {
      return sendErrorResponse(res, null, 'Comment not found', HttpStatusCodeConstants.NOT_FOUND);
    }

    comment.is_approved = true;
    await comment.save();

    res.status(HttpStatusCodeConstants.OK).json(comment);
  } catch (error) {
    sendErrorResponse(res, error, 'Error approving comment', HttpStatusCodeConstants.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { createComment, approveComment };
