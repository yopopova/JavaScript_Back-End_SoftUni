const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessories: [
        {
            type: mongoose.Types.ObjectId, // From MongoDB syntax
            ref: 'Accessory' // Model name
        }
    ]
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;