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

    // valueCtrl routes
    apiRouter.route('/value/insert/').post(valueCtrl.insert);
    apiRouter.route('/value/getcustomersprofile/').get(valueCtrl.getCustomerProfile);

    // connectCtrl
    apiRouter.route('/connect/insert/').post(connectCtrl.insert);

    return apiRouter;
})();
