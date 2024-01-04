const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Provide valid image link!']
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    description: {
        type: String,
        required: true,
        minLength: 10
    },
    genre: {
        type: String,
        required: true,
        minLength: 2
    },
    platform: {
        type: String,
        enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    boughtBy: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;