import api from '../utils/api';

export const getAllPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.posts || [];
  } catch (error) {
    throw error;
  }
};

export const getPostById = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.post;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const response = await api.put(`/posts/${postId}`, postData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const likePost = async (postId) => {
  try {
    const response = await api.post(`/likes/${postId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const unlikePost = async (postId) => {
  try {
    const response = await api.delete(`/likes/${postId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const savePost = async (postId) => {
  try {
    const response = await api.post(`/saved-posts/${postId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const unsavePost = async (postId) => {
  try {
    const response = await api.delete(`/saved-posts/${postId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPostsByCategory = async (categorySlug) => {
  try {
    const response = await api.get(`/categories/${categorySlug}/posts`);
    return response.posts || [];
  } catch (error) {
    throw error;
  }
};


export const getSavedPosts = async () => {
  try {
    const response = await api.get('/saved-posts/all');
    return response.posts || [];
  } catch (error) {
    throw error;
  }
}