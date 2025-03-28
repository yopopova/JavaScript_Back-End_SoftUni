const fs = require('fs');
const path = require('path');

const getContentType = require("./getContentType");

module.exports = (req, res) => {
    // const pathName = url.parse(req.url).pathname;
    // ^ This doesn't working!

    const pathName = req.url;

    if (pathName.startsWith("/content") && req.method === "GET") {
        if (pathName.endsWith("png") || pathName.endsWith("jpg") || pathName.endsWith("jpeg") || pathName.endsWith("ico") && req.method === "GET") {
            fs.readFile(`./${pathName}`, (error, data) => {
                if (error) {
                    console.log(error);
                    res.writeHead(404, {
                        "Content-Type": "text/plain"
                    });

                    res.write("404 Not Found!!!\n");
                    res.end();
                    return;
                }

                // console.log(pathname);
                res.writeHead(200, {
                    "Content-Type": getContentType(pathName)
                });

                res.write(data);
                res.end();
            });

        } else {
            fs.readFile(`./${pathName}`, "utf-8", (error, data) => {
                if (error) {
                    console.log(error);
                    res.writeHead(404, {
                        "Content-Type": "text/plain"
                    });

                    res.write("404 Not Found!!!\n");
                    res.end();
                    return;
                }

                // console.log(pathname);
                res.writeHead(200, {
                    "Content-Type": getContentType(pathName)
                });

                res.write(data);
                res.end();
            });
        }

    } else {
        return true;
    }
}