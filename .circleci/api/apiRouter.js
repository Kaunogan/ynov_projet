/*
 * Title : apiRouter.js
 *
 * Author : GUMBAU Elric, LEMOINE Kaunogan
 * 
 * Date : 23/01/2020
 */

// Imports
var express     = require('express');
var fieldCtrl   = require('./routes/fieldCtrl');
var valueCtrl   = require('./routes/valueCtrl');
var connectCtrl = require('./routes/connectCtrl');

// Router

exports.router = (function() {
    var apiRouter = express.Router();

    // fieldCtrl routes
    apiRouter.route('/field/insert/').post(fieldCtrl.insert);
    apiRouter.route('/field/get/').get(fieldCtrl.get);
    apiRouter.route('/field/delete/').delete(fieldCtrl.delete);
    apiRouter.route('/field/delete/all').delete(fieldCtrl.delete_all);
    apiRouter.route('/field/update/').post(fieldCtrl.update);

    // valueCtrl routes
    apiRouter.route('/value/insert/').post(valueCtrl.insert);
    apiRouter.route('/value/get/').get(valueCtrl.get);
    apiRouter.route('/value/delete/').delete(valueCtrl.delete);
    apiRouter.route('/value/update/').post(valueCtrl.update);

    // connectCtrl
    apiRouter.route('/connect/insert/').post(connectCtrl.insert);
    apiRouter.route('/connect/get/').get(connectCtrl.get);
    apiRouter.route('/connect/delete/').delete(connectCtrl.delete);
    apiRouter.route('/connect/update/').post(connectCtrl.update);

    return apiRouter;
})();
