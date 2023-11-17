const express = require('express');
const path = require('path');

const expressConfig = (app) => {
    const staticFiles = express.static(path.resolve(__dirname, '../public'));
    app.use(staticFiles);
}

module.exports = expressConfig;