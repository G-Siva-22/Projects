// utils/fileHelper.js
const fs = require('fs');
const path = require('path');

// Function to check if a file exists
const fileExists = (filePath) => {
  return fs.existsSync(filePath);
};

// Function to create a directory if it doesn't exist
const createDirectoryIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Function to delete a file
const deleteFile = (filePath) => {
  if (fileExists(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Function to move file from source to destination
const moveFile = (source, destination) => {
  try {
    fs.renameSync(source, destination);
  } catch (err) {
    throw new Error('Error moving the file');
  }
};

module.exports = { fileExists, createDirectoryIfNotExists, deleteFile, moveFile };
