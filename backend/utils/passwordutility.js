// utils/passwordUtils.js
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Could not hash the password');
    }
};

module.exports = { hashPassword };
