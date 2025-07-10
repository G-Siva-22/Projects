import api from '../utils/api';

export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    return response;
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

export const registerUser = async (registerData) => {
  try {
    const response = await api.post('/auth/register', registerData);
    return response;
  } catch (error) {
    throw new Error(error.message || 'Registration failed');
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch profile');
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('/users/profile', profileData);
    return response;
  } catch (error) {
    throw new Error(error.message || 'Failed to update profile');
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get('/auth');
    return response.users || [];
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch users');
  }
};