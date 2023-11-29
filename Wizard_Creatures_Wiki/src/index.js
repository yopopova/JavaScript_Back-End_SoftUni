const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const routes = require('./router');
const { PORT } = require('./constants');

const app = express();

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.get('/', (req, res) => {
    // res.send('Hello home page!');
    res.render('home');
});

app.use(routes);

app.listen(PORT, () => console.log(`The server is listening on port: ${PORT}...`));