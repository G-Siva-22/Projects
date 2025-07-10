import api from '../utils/api';

// Add a comment to a post
export const addComment = async (postId, commentData) => {
  const response = await api.post(`/comments/${postId}`, commentData);
  return response;
};

// Delete a comment
export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response;
};