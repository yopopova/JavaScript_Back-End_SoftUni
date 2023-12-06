const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.regsiter = async (username, email, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Password missmath!');
    }

    // TODO: Check if the user exists
    // TODO: Vlidate the password

    const hashedPassword = await bcrypt.hash(password, 10);

    User.create({ username, email, password: hashedPassword });
}