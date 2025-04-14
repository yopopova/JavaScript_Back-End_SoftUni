const fs = require("fs");
const zlib = require("zlib");

const gzip = zlib.createGzip();
const readStream = fs.createReadStream("./input.txt");
const writeStream = fs.createWriteStream("./output.txt");

readStream.pipe(gzip).pipe(writeStream);

// .pipe(gzip) - така се трансформира файл, преди да бъде записан.
// Ако нямаме файл за output, то само ще си създаде.