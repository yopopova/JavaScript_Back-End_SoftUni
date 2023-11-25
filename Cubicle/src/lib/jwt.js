const jsonwebtoken = require('jsonwebtoken');
const { promisify } = require('util');

const jwt = {
    sign: promisify(jsonwebtoken.sign),
    varify: promisify(jsonwebtoken.verify)
}

module.exports = jwt;