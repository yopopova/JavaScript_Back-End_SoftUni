const fs = require("fs");
const path = require("path");

// Copy ?
const readStream = fs.createReadStream(path.resolve(__dirname, "input.txt")); // Here we should add the folder name -> ./streams/input.txt
const writeStream = fs.createWriteStream(path.resolve(__dirname, "output.txt")); // Here we should add the folder name -> ./streams/output.txt

// react on ReadStreams's event
readStream.on("data", (chunk) => {
  // write in the stream
  writeStream.write(chunk);
});

readStream.on("end", () => {
  console.log("I have finished reading!");
  writeStream.end(); // Like this we close the stream.
});

// This file is like 'piping.js' file.