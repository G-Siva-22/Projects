const { Comment } = require('../../models');
const { ErrorMessages } = require('../../constants/errorMessages');

// Create a new comment 
const createComment = async (req, res) => {
  const { content } = req.body;
  const { projectId } = req.params;
  const { userId } = req.user;

  try {
    if (!content) {
      return res.status(400).json({ error: ErrorMessages.MISSING_FIELDS });
    }

    const comment = await Comment.create({
      content,
      project_id: projectId,
      user_id: userId
    });

    return res.status(201).json({ success: true, comment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ error: ErrorMessages.COMMENT_NOT_FOUND });
    }

    await comment.destroy();

    return res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: ErrorMessages.SERVER_ERROR });
  }
};

module.exports = {
  createComment,
  deleteComment
};