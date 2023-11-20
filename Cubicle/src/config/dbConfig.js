const mongoose = require('mongoose');
const { CONNECTION_STR } = require('./../constants');

async function dbConnect() {
    await mongoose.connect(CONNECTION_STR);
}

module.exports = dbConnect;