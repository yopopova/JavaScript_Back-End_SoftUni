const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// const path = require('path');
const routes = require('./routes');
const { authentication } = require('./middlewares/authMiddleware');
const { PORT, CONNECTION_STR } = require('./constants');

const app = express();

// // Express Config
// app.use(express.static(path.resolve(__dirname, './public')));
// app.use('/static', express.static('public')); // Take all paths, which starts with '/static' and remove it. Another way which doesn't work for me.
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false })); // Body-parser | Middleware which parse forms data from the request and add it like an object into req.body.
// If we set up 'extended' to 'true', this means 'urlencoded' will use 'qs' library. This library is for more complicated options. We set up 'extended' to 'false', because we want ot use easier options.

// // Handlebars Config
app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs'); // If we use root folder, we don't need to set up 'app.set('views', 'src/views')'.

app.use(cookieParser());
app.use(authentication); // After cookieParser, because we use cookies into authMiddleware.

// Router
app.use(routes);

// Connect to the DB
mongoose.set('strictQuery', false); // To remove deprication warning!
mongoose.connect(CONNECTION_STR);

app.listen(PORT, () => console.log(`The server is listening on port: ${PORT}...`));