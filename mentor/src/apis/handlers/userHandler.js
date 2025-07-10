const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { ErrorMessages } = require('../../constants/errorMessages');

// User registration
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check for existing user
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: ErrorMessages.INVALID_CREDENTIALS });
    }

    // Validate role
    const validRoles = ['student', 'mentor'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be student or mentor.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password_hash: hashedPassword,
      role
    });

    return res.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ error: error.message || ErrorMessages.SERVER_ERROR });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: ErrorMessages.INVALID_CREDENTIALS });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: ErrorMessages.INVALID_CREDENTIALS });
    }

    const token = jwt.sign(
      { user: { id: user.id, role: user.role } },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ error: error.message || ErrorMessages.SERVER_ERROR });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: ErrorMessages.USER_NOT_FOUND });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error('Profile Fetch Error:', error);
    return res.status(500).json({ error: error.message || ErrorMessages.SERVER_ERROR });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: ErrorMessages.USER_NOT_FOUND });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password_hash = await bcrypt.hash(password, 10);

    await user.save();

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Profile Update Error:', error);
    return res.status(500).json({ error: error.message || ErrorMessages.SERVER_ERROR });
  }
};

// Delete user account
const deleteUserAccount = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: ErrorMessages.USER_NOT_FOUND });
    }

    await user.destroy();

    return res.status(200).json({ success: true, message: 'User account deleted successfully.' });
  } catch (error) {
    console.error('Account Deletion Error:', error);
    return res.status(500).json({ error: error.message || ErrorMessages.SERVER_ERROR });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount
};


