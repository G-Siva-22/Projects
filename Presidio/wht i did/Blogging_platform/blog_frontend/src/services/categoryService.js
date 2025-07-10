import api from '../utils/api';

// Get all categories
export const getAllCategories = async () => {
  const response = await api.get('/categories');
  return response.categories;
};

// Create a new category (admin only)
export const createCategory = async (categoryData) => {
  const response = await api.post('/categories', categoryData);
  return response;
};

// Assign category to post
export const assignCategoryToPost = async (postId, categoryId) => {
  const response = await api.post('/post-categories', { postId, categoryId });
  return response;
};