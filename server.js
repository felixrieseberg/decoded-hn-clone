'use strict';

const http       = require('http');
const express    = require('express');
const bodyParser = require('body-parser');
const swaggerize = require('swaggerize-express');
const swaggerUi  = require('swaggerize-ui');
const path       = require('path');

const app    = express();
const server = http.createServer(app);
const port   = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use(swaggerize({
    api: path.resolve('./config/api.yaml'),
    handlers: path.resolve('./handlers'),
    docspath: '/swagger'
}));

app.use('/docs', swaggerUi({
    docs: '/v1/swagger'  
}));

server.listen(port, () => {
    app.swagger.api.host = `${server.address().address}:${server.address().port}`;
});
