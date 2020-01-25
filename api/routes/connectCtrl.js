/*
 * Title : connectCtrl.js
 *
 * Author : GUMBAU Elric, LEMOINE Kaunogan
 * 
 * Date : 23/01/2020
 */

// Imports
var models = require('../models');

// Variables
var array_entity_customer       = [];
var array_entity_product        = [];
var array_entity_bill           = [];
var json_connected_entity       = {};
var array_json_connected_entity = {};
var array_json                  = {};
var array_field                 = [];
var array_table_name            = [];
var array_id_table_name         = [];
var id_table_name               = 0;

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
                    return res.status(201).json({'success': `connectFound : ${newConnect.id}`})
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
    },

    // Function to get the data connect
    get: function (req,res) {
    
        /****** SEQUELIZE ******/

        // Request in table 'fields'

        models.field.findAll({
            attributes: ['id','field', 'table_name']
        })
        .then(function (fieldFound) {
            if (fieldFound) {
               for (let i = 0; i < fieldFound.length; i++) {
                  array_field.push(fieldFound[i].field);
                  array_table_name.push(fieldFound[i].table_name);
                  array_id_table_name.push(fieldFound[i].id);
               }
            }
            else {
                return res.status(201).json({'error': 'field not found'})
            }
        })
        .catch(function (err) {
            return res.status(500).json({'error': 'unable to verify field'})
        })

        
        // Request in table 'connects'

        models.connect.findAll({
           attributes: ['customer','product','bill']
        })
        .then(function (connectFound) {
            
            for (let i = 0; i < connectFound.length; i++) {
                array_entity_customer.push(connectFound[i].customer);
                array_entity_product.push(connectFound[i].product);
                array_entity_bill.push(connectFound[i].bill);
            }

            models.value.findAll({
                attributes: ['id_field','value', 'entity'],
                where: {
                    entity: [array_entity_customer, array_entity_product,array_entity_bill]
                }
            })
            .then(function (valueFound) {
                if(valueFound){
                  
                    // Associate customer product bill

                    for (let i = 0; i < array_entity_customer.length; i++) { 
                       
                        for (let j = 0; j < valueFound.length; j++) {
                            if(array_entity_customer[i] == valueFound[j].entity){

                                // Get the table_name
                                id_table_name =  array_id_table_name.indexOf(parseInt(valueFound[j].id_field));

                                // Insert the value in 'json_connected_entity'
                                json_connected_entity[`${array_field[id_table_name]}`] = valueFound[j].value;
                            }
                        }

                        array_json_connected_entity[`customer`] = json_connected_entity
                        json_connected_entity = {}
                        
                        for (let l = 0; l < valueFound.length; l++) {
                            if(array_entity_product[i] == valueFound[l].entity ){
                                
                                // Get the table_name
                                id_table_name =  array_id_table_name.indexOf(parseInt(valueFound[l].id_field));
                                
                                // Insert the value in 'json_connected_entity'
                                json_connected_entity[`${array_field[id_table_name]}`] = valueFound[l].value;
                            }
                        }

                        array_json_connected_entity[`product`] = json_connected_entity
                        json_connected_entity = {}
                        
                        for (let n = 0; n < valueFound.length; n++) {
                            if(array_entity_bill[i] == valueFound[n].entity){

                                // Get the table_name
                                id_table_name =  array_id_table_name.indexOf(parseInt(valueFound[n].id_field));

                                // Insert the value in 'json_connected_entity'
                                json_connected_entity[`${array_field[id_table_name]}`] = valueFound[n].value;
                            }
                        }

                        array_json_connected_entity[`bill`] = json_connected_entity
                        json_connected_entity = {}
                        
                        array_json[`connect_${i}`]  = array_json_connected_entity
                        array_json_connected_entity = {}
                    }

                    res.status(201).json(array_json);

                    //Clear array

                    array_json_connected_entity = {};
                    array_json = {};
                    json_connected_entity = {}
                    array_entity_customer = [];
                    array_entity_product = [];
                    array_entity_bill = [];
                }
                else {
                    return res.status(201).json({'error': 'value not found'})
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'unable to verify value'})
            })
        })
        .catch(function (err) {
            return res.status(500).json({'error': 'unable to verify connect'})
        })
    },

    // Function to delete the values in 'connects' with sequelize
    delete: function (req,res) {

        /****** PARAMS ******/
        var id = req.body.id;
  
        /****** CHECK ******/
  
        if(id == null){
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        else if (id == ""){
            return res.status(400).json({ 'error': 'id is empty' });
        }
        else if(!NB_REGEX.test(id)){
            return res.status(400).json({ 'error': `parameter id : ${id} need to have only number` });
        }
  
        /***** SEQUELIZE ******/
  
        models.connect.destroy({
            where:{
                id: id
            }
        })
        .then(function (id) {
            if(id){
              res.status(200).json({ "success": "id deleted" });
            }
            else {
              res.status(500).json({ "error": "invalid id" });
            }
        })
        .catch(function (err) {
          res.status(500).json({ "error": "invalid id" });
         });
    },

    // Function to update data in connects with sequelize
    update: function (req,res) {
    
        /****** PARAMS ******/
  
        var id = req.body.id;
        var field = req.body.field;
        var value = req.body.value;
  
        /****** CHECK ******/
  
        if(id == null || field == null || value == null){
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        else if (id == "" || field == "" || value == ""){
            return res.status(400).json({ 'error': 'parameters empty' });
        }
        else if(!NB_REGEX.test(id)){
            return res.status(400).json({ 'error': `parameter id : ${id} need to have only number` });
        }
  
        /***** SEQUELIZE ******/
  
        // Update value in fields
        models.connect.update(
            {[field]: value},
            {where: {id: id},
        })
        .then(function (updateField) {
            if(updateField){
                res.status(200).json({ "Success": "field updated" });
            }
            else{
                res.status(404).json({ "error": "no field found" });
            }
        })
        .catch(function (err) {
          res.status(500).json({ "error": "invalid id" });
         }); 
    }
}