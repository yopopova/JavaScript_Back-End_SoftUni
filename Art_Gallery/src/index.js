const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./router');
const { auth } = require('./middlewares/authMiddleware');
const { PORT, CONNECTION_STR } = require('./constants');

const app = express();

// // Express Config
app.use(express.static(path.resolve(__dirname, './public'))); // Add static files
app.use(express.urlencoded({ extended: false })); // Add body-parser

// Add cookie-parser
app.use(cookieParser());

// Add authentication
app.use(auth);

// // Handlebars Config
app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Connection to the DB
async function dbConnect() {
    await mongoose.connect(CONNECTION_STR);
}

dbConnect()
    .then(() => {
        console.log('Successfully connected to the DB!');
    })
    .catch(error => console.log(`Error while connecting to the DB. Error: ${error}`));

// Routes
app.use(routes);

app.listen(PORT, () => console.log(`The server is listening on port: ${PORT}...`));