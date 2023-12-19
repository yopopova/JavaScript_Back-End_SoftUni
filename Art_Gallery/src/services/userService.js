const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("../lib/jwt");
const { SECRET } = require('../constants');

async function validatePassword(password, userPassword) {
    const isValid = await bcrypt.compare(password, userPassword);

    if (!isValid) {
        throw new Error('Invalid username or password!');
    }
}

async function getToken(user) {
    const payload = { _id: user._id, username: user.username };
    const token = await jwt.sign(payload, SECRET, { expiresIn: '3d' });

    return token;
}

exports.register = async (userData) => {
    const { password } = userData;
    const user = await User.create(userData);

    await validatePassword(password, user.password);

    const token = await getToken(user);
    return token;
}

exports.login = async (username, password) => {
    // Validate USER
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Invalid username or password!');
    }

    await validatePassword(password, user.password);

    const token = await getToken(user);
    return token;
}