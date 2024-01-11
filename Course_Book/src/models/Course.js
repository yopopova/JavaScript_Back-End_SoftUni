const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5
    },
    type: {
        type: String,
        required: true,
        minLength: 3
    },
    certificate: {
        type: String,
        required: true,
        minLength: 2
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Provide valid creature image link!']
    },
    description: {
        type: String,
        required: true,
        minLength: 10
    },
    price: {
        type: Number,
        required: true
    },
    signUpList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;