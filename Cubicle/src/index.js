const express = require('express');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');

const { PORT } = require('./constants');
const routes = require('./router');

const app = express();

// Configs
expressConfig(app);
handlebarsConfig(app);

// Routing
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));