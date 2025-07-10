// interfaces/userInterface.js

/**
 * @typedef {Object} User
 * @property {number} user_id - The unique identifier for the user.
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password_hash - The hashed password of the user.
 * @property {string} full_name - The full name of the user.
 * @property {string} bio - A short bio of the user.
 * @property {string} profile_image - The URL of the user's profile image.
 * @property {string} role - The role of the user (user or admin).
 * @property {string} created_at - The timestamp when the user was created.
 * @property {string} updated_at - The timestamp when the user was last updated.
 */

/**
 * @typedef {Object} UserLogin
 * @property {string} email - The email address of the user.
 * @property {string} password - The password entered by the user for authentication.
 */
