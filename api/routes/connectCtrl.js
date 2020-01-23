/*
 * Title : connectCtrl.js
 *
 * Author : GUMBAU Elric, LEMOINE Kaunogan
 * 
 * Date : 23/01/2020
 */

// Imports
var models = require('../models');

// Constant
const  NB_REGEX = /^\d+$/;

// Routes
module.exports = {

    // Function to insert the field with sequelize
    insert: function (req,res) {
        
        /****** PARAMS ******/

        var customer = req.body.customer;
        var product  = req.body.product;
        var bill     = req.body.bill;

        /****** CHECK ******/

        // Check if params are valid
        if(customer == null || product == null || bill == null){
            return res.status(400).json({'error': 'missing parameters'});
        } 
        else if(customer == "" || product == "" ||bill == ""){
            return res.status(400).json({'error': 'parameters empty'});
        }
        else if(!NB_REGEX.test(customer)){ // Check if customer is only a number with REGEX
            return res.status(400).json({'error': `parameter customer : ${customer} need to be a number`});
        }
        else if(!NB_REGEX.test(product)){ // Check if product is only a number with REGEX
            return res.status(400).json({'error': `parameter product : ${product} need to be a number`});
        }
        else if(!NB_REGEX.test(bill)){ // Check if bill is only a number with REGEX
            return res.status(400).json({'error': `parameter product : ${bill} need to be a number`});
        }
       
        /****** SEQUELIZE ******/

        // Use Sequelize to check if field already exist if not insert the data
        models.connect.findOne({
            attributes: ['customer', 'product', 'bill'],
            where: {
                customer: customer,
                product: product,
                bill: bill,
            }
        })
        .then(function(connectFound) {
            if(!connectFound){ // if field was not found, insert the data
                var newConnect = models.connect.create({
                    customer: customer,
                    product: product,
                    bill: bill,
                })
                .then(function (newConnect) {
                    return res.status(201).json({'success': `connectFound : ${connectFound.id}`})
                })
                .catch(function (err) {
                    return res.status(500).json({'error': 'cannot add connect'})
                })
            } else {
                return res.status(409).json({'error': 'connect already exist'})
            }
        })
        .catch(function (err) {
            return res.status(500).json({'error': 'unable to verify connect'})
        });
    }
}