const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');

const routes = require('./router');
const { PORT, CONNECTION_STR } = require('./constants');

const app = express();

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// DB Connection
async function dbConnect() {
    await mongoose.connect(CONNECTION_STR);
}

dbConnect()
    .then(() => {
        console.log('Successfully connected to the DB!');
    })
    .catch(err => console.log(`Error while connecting to the DB. Error: ${err}`));

// Routes
app.use(routes);

app.listen(PORT, () => console.log(`The server is listening on port: ${PORT}...`));