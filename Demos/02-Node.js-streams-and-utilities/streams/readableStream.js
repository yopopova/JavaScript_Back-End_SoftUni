const fs = require("fs");

// !!! При 'readable stream' имаме файл (input.txt), от който четем. !!!

// stream
// Both files should be in the same folder
// Стриймът сам завърсшва.
const readStream = fs.createReadStream("./input.txt", {
  highWaterMark: 10000, // Така задаваме колко КБ искаме да ни е всеки чънк.
  encoding: "utf-8", // Пишем "utf-8", за да ни излезе като текст. В противен случай ще ни излезе в 16-тичната бройна система в отселни буфери, в зависимост от дължината на текста.
});

// on -> for events
// Пишем 'data', защото в случая искаме да прочетем данни.
// При стриймове, които просто реагират на събития с 'on' не е нужно да затваряме стрийма с 'end'.
readStream.on("data", (chunk) => {
  console.log("Reading chunk....");
  console.log(chunk);
});

// Like this we and the current stream
readStream.on("end", () => {
  console.log("Reading has finished!");
});

// Когато просто сме се абонирали да слушаме за някакво събитие, не е нужно да затваряме стрийма.