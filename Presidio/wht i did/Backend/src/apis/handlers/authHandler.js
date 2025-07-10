// apis/handlers/authHandler.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { HttpStatusCodeConstants } = require('../../constants/HttpStatusCodeConstants');
const { User } = require('../../models');
const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(HttpStatusCodeConstants.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordMatch) {
      return res.status(HttpStatusCodeConstants.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.user_id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(HttpStatusCodeConstants.OK).json({ token });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, full_name } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(HttpStatusCodeConstants.BAD_REQUEST).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      password_hash: hashedPassword,
      full_name,
    });

    const token = jwt.sign({ userId: newUser.user_id, role: 'User' }, JWT_SECRET, { expiresIn: '1h' });
    res.status(HttpStatusCodeConstants.CREATED).json({ token });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

module.exports = { login, register };
