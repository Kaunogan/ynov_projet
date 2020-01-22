// Imports
var express    = require('express');
var bodyParser = require('body-parser');
var apiRouter  = require('./apiRouter').router;

// Instanciate server
var server = express();

// Body Parser configuration
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

// Configure routes
server.get('/', function (req,res) {
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Hello World !</h1>')
});

server.use('/api/', apiRouter);

// Launch server
server.listen(8181, function () {
    console.log('🚀 Server listen on port 8181 !');
});