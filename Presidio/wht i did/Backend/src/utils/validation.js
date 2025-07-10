// utils/validation.js
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Function to validate email format
const validateEmail = (email) => {
  return emailRegex.test(email);
};

// Function to validate password (minimum 8 characters, at least one letter and one number)
const validatePassword = (password) => {
  return passwordRegex.test(password);
};

// Function to check if the input is empty or null
const validateNotEmpty = (value) => {
  return value && value.trim() !== '';
};

module.exports = { validateEmail, validatePassword, validateNotEmpty };
