// interfaces/postInterface.js

/**
 * @typedef {Object} Post
 * @property {number} post_id - The unique identifier for the post.
 * @property {number} author_id - The user ID of the author who created the post.
 * @property {string} title - The title of the post.
 * @property {string} slug - The URL-friendly version of the title for the post.
 * @property {string} content - The main content of the post.
 * @property {string} excerpt - A short excerpt or summary of the post content.
 * @property {string} thumbnail - The URL of the post's thumbnail image.
 * @property {string} status - The status of the post (e.g., 'draft', 'published').
 * @property {string} created_at - The timestamp when the post was created.
 * @property {string} updated_at - The timestamp when the post was last updated.
 * @property {string} published_at - The timestamp when the post was published.
 * @property {boolean} is_featured - Whether the post is marked as featured or not.
 * @property {number} view_count - The number of views the post has received.
 */

/**
 * @typedef {Object} PostCreate
 * @property {string} title - The title of the post.
 * @property {string} content - The content of the post.
 * @property {string} excerpt - A short excerpt or summary of the post.
 * @property {string} [thumbnail] - The URL of the thumbnail image.
 * @property {string} status - The status of the post (e.g., 'draft', 'published').
 * @property {boolean} [is_featured] - Whether the post should be featured (default false).
 */

/**
 * @typedef {Object} PostUpdate
 * @property {string} title - The title of the post.
 * @property {string} content - The content of the post.
 * @property {string} excerpt - A short excerpt or summary of the post.
 * @property {string} [thumbnail] - The URL of the thumbnail image.
 * @property {string} status - The status of the post (e.g., 'draft', 'published').
 * @property {boolean} [is_featured] - Whether the post should be featured.
 */
