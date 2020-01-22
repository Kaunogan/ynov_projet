// Imports
var express      = require('express');
var newFieldCtrl = require('./routes/newFieldCtrl');
var valueCtrl = require('./routes/valueCtrl');

// Router
exports.router = (function() {
    var apiRouter = express.Router();

    // newField routes
    apiRouter.route('/newField/insert/').post(newFieldCtrl.insert);

    // valueCtrl routes
    apiRouter.route('/value/insert/').post(valueCtrl.insert);

    return apiRouter;

})();
