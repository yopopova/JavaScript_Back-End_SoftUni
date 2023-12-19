const User = require("../models/User");

exports.findAuthor = (authorId) => User.findById(authorId).lean();

exports.findUser = (userId) => User.findById(userId).lean();