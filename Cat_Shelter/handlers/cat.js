const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds.json');
// const cats = require('../data/cats.json');

module.exports = (req, res) => {
    const pathName = req.url;

    if (pathName === '/cats/add-cat' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));
        const input = fs.createReadStream(filePath); // Or we can use 'readFile'.

        input.on('data', (data) => {
            let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`).join("");
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder);
            res.write(modifiedData);
        });

        input.on('end', () => res.end()); // Close the response
        input.on('error', (error) => console.log(error)); // Error handling

    } else if (pathName === '/cats/add-breed' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));
        const input = fs.createReadStream(filePath); // Or we can use 'readFile'.

        input.on('data', (data) => res.write(data));
        input.on('end', () => res.end());
        input.on('error', (error) => console.log(error));

    } else if (pathName === '/cats/add-breed' && req.method === 'POST') {
        let filePath = path.normalize(path.join(__dirname, "../data/breeds.json"));

        let formData = '';

        req.on('data', (data) => {
            formData += data;
        });

        req.on('end', () => {
            let body = qs.parse(formData);

            fs.readFile(filePath, (error, data) => {
                // ^ Here we read the 'breeds.json' file

                if (error) {
                    throw error;
                }

                let breeds = JSON.parse(data);
                // console.log(body.breed);

                breeds.push(body.breed); // Here we modify the 'breeds.json' file

                let json = JSON.stringify(breeds.sort());
                fs.writeFile(filePath, json, () => console.log("The breed was added successfully!"));
                // ^ Like this we update the 'breeds.json' file
            });

            res.writeHead(301, { "location": "/" }); // Redirect to the home page
            res.end(); // End the response
        });

    } else if (pathName === "/cats/add-cat" && req.method === "POST") {
        let form = new formidable.IncomingForm();           // form is used for processing various form data 

        form.parse(req, (error, fields, files) => {
            // fields - holds all form fields
            
            if (error) {
                throw error;
            }

            let oldPath = files.upload[0].filepath;
            
            // let newPath = path.normalize(path.join(__dirname, "../content/images/" + files.upload.name)); // This doesn't work.
            let newPath = path.normalize(path.join(__dirname, "../content/images/" + files.upload[0].originalFilename));

            fs.rename(oldPath, newPath, (error) => {
                if (error) {
                    throw error;
                }

                console.log("Files was uploaded sccessfully!");
            });

            fs.readFile("./data/cats.json", "utf-8", (error, data) => {
                // Like this we add new object to 'cats.json'

                if (error) {
                    throw error;
                }

                let allCats = JSON.parse(data); // Parsing the data to array of objects

                // allCats.push({ id: catsFile.length + 1, ...fields, image: files.upload.name, taken: false }); // This doesn't work
                allCats.push({ id: Date.now(), name: fields.name[0], description: fields.description[0], breed: fields.breed[0], image: files.upload[0].originalFilename });
                // Like this we construct and add new object

                // Set the data back to JSON format
                let json = JSON.stringify(allCats);

                // Rewrite the original file with the new cat info
                fs.writeFile("./data/cats.json", json, () => {
                    res.writeHead(301, { location: "/" }); // Redirect to the home page
                    res.end(); // End the response
                });
            });
        });

    } else if (pathName.includes("/cats-edit") && req.method === "GET") {
        let filePath = path.normalize(path.join(__dirname, "../views/editCat.html"));
        const input = fs.createReadStream(filePath);

        const currentCat = catsFile[Number(pathName.match(/\d+$/g)) - 1];
        console.log(currentCat);

        input.on("data", (data) => {
            let modifiedData = data.toString().replace('{{id}}', currentCat.id);
            console.log(currentCat.name);
            modifiedData = modifiedData.toString().replace('{{name}}', currentCat.name);
            modifiedData = modifiedData.toString().replace('{{description}}', currentCat.description);

            const breedsAsOptions = breedsFile.map((b) => `<option value="${b}">${b}</option>`);
            modifiedData = modifiedData.replace("{{catBreeds}}", breedsAsOptions.join("/"));

            modifiedData = modifiedData.replace("{{breed}}", currentCat.breed);
            res.write(modifiedData);
        });

        input.on("end", () => res.end());
        input.on("error", (err) => console.log(err));

    } else if (pathName.includes("/cats-edit") && req.method === "POST") {     // similiar logic to Add Cat
        const catId = Number(pathName.match(/\d+$/g)) - 1;
        // console.log(catId);
        let form = new formidable.IncomingForm();

        form.parse(req, (error, fields, files) => {
            if (error) {
                throw error;
            }

            let filesUploadName;

            if (!!files.upload.name) { // Check if during edit there is a new picture file. If not - it will be empty
                // Move of the uploaded file (in this case - picture)
                let oldPath = files.upload.path; // Taking them from the default formidable folder
                let newPath = path.normalize(path.join(__dirname, "../content/images/" + files.upload.name));  // Creating new path in my folder
                
                fs.rename(oldPath, newPath, (error) => { // Transfer     
                    if (error) {
                        throw error;
                    }

                    console.log("Files was uploaded sccessfully!");
                });

                filesUploadName = files.upload.name;

            } else {
                filesUploadName = undefined;
            }

            // Add new object to cats.json
            fs.readFile("./data/cats.json", "utf-8", (error, data) => {
                if (error) {
                    throw error;
                }

                let allCats = JSON.parse(data); // Parsing to array of objects
                console.log(allCats);
                console.log(fields);

                allCats[catId] = { id: catId + 1, ...fields, image: filesUploadName }; // constructing and replacing the object

                let json = JSON.stringify(allCats); // set back to JSON

                fs.writeFile("./data/cats.json", json, () => { // rewrite the original file with the new cat info
                    res.writeHead(301, { location: "/" }); // Redirect to the home page
                    res.end();
                })
            })
        })

    } else if (pathName.includes("/cats-find-new-home") && req.method === "GET") {
        let filePath = path.normalize(path.join(__dirname, "../views/catShelter.html"));
        const input = fs.createReadStream(filePath);
        const currentCat = catsFile[Number(pathname.match(/\d+$/g)) - 1];
        
        input.on("data", (data) => {
            let modifiedData = data.toString().replace('{{id}}', currentCat.id);
            modifiedData = modifiedData.toString().replace('{{name}}', currentCat.name); // Technical dept: once for the alt
            modifiedData = modifiedData.toString().replace('{{name}}', currentCat.name); // Twice for the name   
            modifiedData = modifiedData.toString().replace('{{description}}', currentCat.description);
            modifiedData = modifiedData.toString().replace('{{image}}', path.join('../content/images/' + currentCat.image));

            const breedsAsOptions = breedsFile.map((b) => `<option value="${b}">${b}</option>`);
            modifiedData = modifiedData.replace("{{catBreeds}}", breedsAsOptions.join("/"));

            modifiedData = modifiedData.replace("{{breed}}", currentCat.breed);
            res.write(modifiedData);
        });

        input.on("end", () => res.end());
        input.on("error", (err) => console.log(err));

    } else if (pathName.includes("/cats-find-new-home") && req.method === "POST") { // Similiar logic to Add Cat
        const catId = Number(pathname.match(/\d+$/g)) - 1;
        console.log(catId);

        fs.readFile("./data/cats.json", "utf-8", (error, data) => {
            if (error) {
                throw error;
            }

            let allCats = JSON.parse(data); // Parsing to array of objects
            console.log(allCats[catId].taken);
            allCats[catId].taken = true;

            let json = JSON.stringify(allCats); // Set the data back to JSON
            console.log(allCats[catId].taken);

            fs.writeFile("./data/cats.json", json, () => { // Rewrite the original file with the new cat info
                res.writeHead(301, { location: "/" }); // Redirect to the home page
                res.end();
            })
        })
    } else {
        return true;
    }

}