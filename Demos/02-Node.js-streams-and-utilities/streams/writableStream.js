const fs = require("fs");

// !!! При 'writable stream' имаме файл (output.txt), в който визуализираме информацията. !!!

const writeStream = fs.createWriteStream("./output.txt");

// Така печатаме стриймовете.
writeStream.write("Chunk 1");
writeStream.write("Chunk 2");
writeStream.write("Chunk 3");
writeStream.write("Chunk 4");
writeStream.end(); // Така приключваме стрийма.
// Браузърът няма да спре да записва стриймовете, докато не му се каже да спре с 'end'.
// Когато пишем неща по стрийнма, после трябва задължително да гозатворим.