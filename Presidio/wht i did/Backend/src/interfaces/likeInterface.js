// interfaces/likeInterface.js

/**
 * @typedef {Object} Like
 * @property {number} like_id - The unique identifier for the like.
 * @property {number} post_id - The ID of the post that was liked.
 * @property {number} user_id - The ID of the user who liked the post.
 * @property {string} liked_at - The timestamp when the post was liked.
 */

/**
 * @typedef {Object} LikeCreate
 * @property {number} post_id - The ID of the post to like.
 * @property {number} user_id - The ID of the user who likes the post.
 */
