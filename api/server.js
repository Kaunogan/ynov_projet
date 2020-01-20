// Imports
var express = require('express');

// Instanciate server
var server = express();

// Configure routes
server.get('/', function (req,res) {
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Hello World !</h1>')
});

// Launch server
server.listen(8181, function () {
    console.log('Server listen on port 8181 !');
});