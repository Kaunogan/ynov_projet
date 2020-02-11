

//Imports
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path'); // Charge le module path
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // Permet de parser l'url pour récuperer les informations de connexion
var Api = require('./api/Api');

//Instantiate server
var server = express();

//Instantiate class Api
const api = new Api();

//Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Make static CSS, JS files, images etc ...
server.use(express.static(path.join(__dirname, "assets")));

//When the user arrives on Ynov's blog, we display the login page
server.get('/', function (req, res) {
    res.status(200);
    res.render('index.ejs'); //login.ejs page is returned to the user
})


// Use /api/ at our api

// If the page requested by the user does not exist
server.use(function (req, res, next) {
    res.status(404).render('error/404.ejs');
});

//Launch server
server.listen(8080, function () {
    console.log('Server listen on port 8080')
});
