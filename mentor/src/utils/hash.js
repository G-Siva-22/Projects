const bcrypt = require('bcryptjs');

// Hash password before storing it in the database
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
        return hashedPassword;
    } catch (err) {
        throw new Error('Error hashing password');
    }
};

// Compare hashed password with the input password
const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword); // Return boolean value
    } catch (err) {
        throw new Error('Error comparing password');
    }
};

module.exports = { hashPassword, comparePassword };
