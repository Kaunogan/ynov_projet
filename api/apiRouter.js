// Imports
var express      = require('express');
var fieldCtrl = require('./routes/fieldCtrl');
var valueCtrl = require('./routes/valueCtrl');

// Router
exports.router = (function() {
    var apiRouter = express.Router();

    // newField routes
    apiRouter.route('/field/insert/').post(fieldCtrl.insert);

    // valueCtrl routes
    apiRouter.route('/value/insert/').post(valueCtrl.insert);

    return apiRouter;
})();
