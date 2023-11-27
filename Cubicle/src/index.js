const express = require('express');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const dbConnect = require('./config/dbConfig');
const errorHandler = require('./middlewares/errorHandlerMiddleware');

const { PORT } = require('./constants');
const routes = require('./router');

const app = express();

// Configs
expressConfig(app);
handlebarsConfig(app);

// Connecting to the DB
dbConnect()
    .then(() => console.log('Successfully connected  to the DB!'))
    .catch((error) => console.log(`Error while connecting to DB: ${error}`));

// Routing
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));