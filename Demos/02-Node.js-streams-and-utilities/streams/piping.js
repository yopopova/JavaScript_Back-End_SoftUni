const fs = require("fs");

// Copy ?
const readStream = fs.createReadStream("./input.txt");
const writeStream = fs.createWriteStream("./output.txt");

readStream.pipe(writeStream);
// Така прочитаме стрийм и го записваме в даден файл.
// По default пайпингът си затваря и си отваря сам стриймовете.

// This file is like 'readWriteStream.js' file.