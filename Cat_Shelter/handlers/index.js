// Link 1: https://github.com/ntzolov/SoftUni-exercises/blob/main/05.JS%20back-end/Cat%20Shelter/handlers/cat.js
// Link 2: https://github.com/mariu6/Cat-Shelter/blob/master/handlers/cat.js 

const homeHandler = require('./home');
const staticFiles = require('./static-files');
const catHandler = require('./cat');

module.exports = [homeHandler, staticFiles, catHandler];