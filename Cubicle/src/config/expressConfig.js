const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { auth } = require('../middlewares/authMiddleware');

const expressConfig = (app) => {
    const staticFiles = express.static(path.resolve(__dirname, '../public'));
    app.use(staticFiles);

    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(auth);
}

module.exports = expressConfig;