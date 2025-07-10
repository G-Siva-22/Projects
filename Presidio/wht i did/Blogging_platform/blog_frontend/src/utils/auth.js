const TOKEN_KEY = 'blog_token';
const USER_KEY = 'blog_user';

// Get token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Set token and user to localStorage
export const setAuth = (authResponse) => {
  localStorage.setItem(TOKEN_KEY, authResponse.token);
  localStorage.setItem(USER_KEY, JSON.stringify(authResponse.user));
};

// Remove token and user from localStorage
export const removeAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Get user from localStorage
export const getUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    removeAuth();
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken() && !!getUser();
};

// Check if user is admin
export const isAdmin = () => {
  const user = getUser();
  return !!user && user.role === 'admin';
};