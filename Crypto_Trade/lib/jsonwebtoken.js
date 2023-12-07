const jwt = require('jsonwebtoken');
const util = require('util');

// JWT two methods: 'sign' and 'verify' | From callback-based to promise-based
exports.sign = util.promisify(jwt.sign);
exports.verify = util.promisify(jwt.verify);