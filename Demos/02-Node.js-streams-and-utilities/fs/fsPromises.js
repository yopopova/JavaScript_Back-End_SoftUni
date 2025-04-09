const fs = require("fs/promises"); // This returns promises. All of them are asyncronous.

fs.readFile("./input.txt", "utf-8")
  .then((data) => {
    return fs.writeFile("./output.txt", data, "utf-8");
  })
  .then(() => {
    console.log("File is saved!");
  })
  .catch((err) => console.log("Error:", err));
