const bcrypt = require('bcryptjs');
const saltRounds = 10;

async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function comparePassword(password, storedPassword) {
    const isTheSame = await bcrypt.compare(password, storedPassword);
    return isTheSame;
}

module.exports = { hashPassword, comparePassword }
