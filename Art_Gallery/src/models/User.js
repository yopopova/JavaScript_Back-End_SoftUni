const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    },
    address: {
        type: String,
        required: true,
        maxLength: 20
    },
    publications: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Publication'
        }
    ]
});

// userSchema.path('email').validate(function (email) {
//     const emailFromDb = mongoose.model('User').findOne({ email });
//     return !!emailFromDb;
// }, 'Email already exists!');

userSchema.virtual('repeatPassword').set(function (value) {
    if (value !== this.password) {
        throw new Error('Password missmath!');
    }
});

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);
module.exports = User;