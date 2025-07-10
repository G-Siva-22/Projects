import api from '../utils/api';
import { AuthResponse, LoginData, RegisterData, User } from '../types';

// Login user
export const loginUser = async (loginData: LoginData): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', loginData);
  return response;
};

// Register user
export const registerUser = async (registerData: RegisterData): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', registerData);
  return response;
};

// Get user profile
export const getUserProfile = async (): Promise<User> => {
  const response = await api.get('/users/profile');
  return response;
};

// Update user profile
export const updateUserProfile = async (profileData: Partial<User>): Promise<{ message: string }> => {
  const response = await api.put('/users/profile', profileData);
  return response;
};

// Get all users (admin only)
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get('/auth');
  return response.users;
};