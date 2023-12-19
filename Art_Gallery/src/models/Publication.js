const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 6
    },
    paintingTechnique: {
        type: String,
        required: true,
        maxLength: 15
    },
    artPicture: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Provide valid creature image link!']
    },
    certificate: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    usersSharing: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Publication = mongoose.model('Publication', publicationSchema);
module.exports = Publication;