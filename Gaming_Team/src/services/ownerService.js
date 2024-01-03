const User = require("../models/User");

exports.findOwner = (ownerId) => User.findById(ownerId).lean();

exports.findUser = (userId) => User.findById(userId).lean();