// interfaces/categoryInterface.js

/**
 * @typedef {Object} Category
 * @property {number} category_id - The unique identifier for the category.
 * @property {string} name - The name of the category.
 * @property {string} slug - The URL-friendly version of the category name.
 * @property {string} description - A brief description of the category.
 * @property {string} created_at - The timestamp when the category was created.
 */

/**
 * @typedef {Object} CategoryCreate
 * @property {string} name - The name of the category.
 * @property {string} description - A description of the category.
 */

/**
 * @typedef {Object} CategoryUpdate
 * @property {string} name - The name of the category.
 * @property {string} description - The updated description of the category.
 */
