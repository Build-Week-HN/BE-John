const express = require('express');

// routers
const apiRouter = require('./api-router.js');


// middlewares
const configureMiddleware = require('./configure-middleware.js');

const server = express();
configureMiddleware(server);

server.use('/api', apiRouter);

module.exports = server;
