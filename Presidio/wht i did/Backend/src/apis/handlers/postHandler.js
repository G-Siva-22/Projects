// apis/handlers/postHandler.js
const { Post, User, Category } = require('../../models');
const { HttpStatusCodeConstants } = require('../../constants/HttpStatusCodeConstants');
const { sendErrorResponse } = require('../../utils/responseHelper');

const createPost = async (req, res) => {
  const { title, content, category_id } = req.body;
  try {
    const newPost = await Post.create({
      title,
      content,
      author_id: req.decodedUser.userId,
      category_id,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
    });
    res.status(HttpStatusCodeConstants.CREATED).json(newPost);
  } catch (error) {
    sendErrorResponse(res, error, 'Error creating post', HttpStatusCodeConstants.INTERNAL_SERVER_ERROR);
  }
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, content, category_id } = req.body;

  try {
    const post = await Post.findOne({ where: { post_id: postId } });

    if (!post) {
      return sendErrorResponse(res, null, 'Post not found', HttpStatusCodeConstants.NOT_FOUND);
    }

    if (post.author_id !== req.decodedUser.userId) {
      return sendErrorResponse(res, null, 'You can only edit your own posts', HttpStatusCodeConstants.FORBIDDEN);
    }

    await post.update({ title, content, category_id });
    res.status(HttpStatusCodeConstants.OK).json(post);
  } catch (error) {
    sendErrorResponse(res, error, 'Error updating post', HttpStatusCodeConstants.INTERNAL_SERVER_ERROR);
  }
};

const getPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findOne({ where: { post_id: postId }, include: [User, Category] });

    if (!post) {
      return sendErrorResponse(res, null, 'Post not found', HttpStatusCodeConstants.NOT_FOUND);
    }

    post.view_count += 1;
    await post.save();

    res.status(HttpStatusCodeConstants.OK).json(post);
  } catch (error) {
    sendErrorResponse(res, error, 'Error fetching post', HttpStatusCodeConstants.INTERNAL_SERVER_ERROR);
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findOne({ where: { post_id: postId } });

    if (!post) {
      return sendErrorResponse(res, null, 'Post not found', HttpStatusCodeConstants.NOT_FOUND);
    }

    if (post.author_id !== req.decodedUser.userId) {
      return sendErrorResponse(res, null, 'You can only delete your own posts', HttpStatusCodeConstants.FORBIDDEN);
    }

    await post.destroy();
    res.status(HttpStatusCodeConstants.NO_CONTENT).send();
  } catch (error) {
    sendErrorResponse(res, error, 'Error deleting post', HttpStatusCodeConstants.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { createPost, updatePost, getPost, deletePost };
