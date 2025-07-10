// interfaces/commentInterface.js

/**
 * @typedef {Object} Comment
 * @property {number} comment_id - The unique identifier for the comment.
 * @property {number} post_id - The ID of the post the comment is associated with.
 * @property {number} user_id - The ID of the user who made the comment.
 * @property {string} content - The content of the comment.
 * @property {string} created_at - The timestamp when the comment was created.
 * @property {boolean} is_approved - Whether the comment has been approved for public viewing.
 */

/**
 * @typedef {Object} CommentCreate
 * @property {number} post_id - The ID of the post to comment on.
 * @property {string} content - The content of the comment.
 */

/**
 * @typedef {Object} CommentUpdate
 * @property {string} content - The updated content of the comment.
 * @property {boolean} is_approved - Whether the comment is approved or not.
 */
