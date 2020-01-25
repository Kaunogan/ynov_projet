/*
 * Title : valueCtrl.js
 *
 * Author : GUMBAU Elric, LEMOINE Kaunogan
 * 
 * Date : 25/01/2020
 */

// Imports
var models = require('../models');

// Constant
const NB_REGEX = /^\d+$/;
const LETTER_REGEX = /^[a-zA-Z]+$/;

// Variable
var array_id_table_name           = [];
var array_field                   = [];
var array_json_entity             = [];
var array_json_entity_unique      = [];
var array_json                    = {};
var json                          = {};
var id_table_name                 = 0;

// Routes
module.exports = {

    // Function to insert the value with sequelize
    insert: function (req, res) {

        /****** PARAMS ******/

        var id_field = req.body.id_field;
        var value = req.body.value;
        var entity = req.body.entity;

        /****** CHECK ******/

        // Check if params are valid
        if (id_field == null || value == null || entity == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        else if (id_field == "" || value == "" || entity == "") {
            return res.status(400).json({ 'error': 'parameters empty' });
        }
        else if (!NB_REGEX.test(id_field)) { // Check if id_field is only a number with REGEX
            return res.status(400).json({ 'error': `parameter id_field : ${id_field} need to be a number` });
        }
        else if (!NB_REGEX.test(entity)) { // Check if entity is only a number with REGEX
            return res.status(400).json({ 'error': `parameter entity : ${entity} need to be a number` });
        }

        /****** SEQUELIZE ******/

        // Check if field already exist if not insert the data
        models.value.findOne({
            attributes: ['value', 'entity'],
            where: {
                value: value,
                entity: entity,
            }
        })
        .then(function (valueFound) {
            if (!valueFound) { // value was not found inert the data
                var newValue = models.value.create({
                    id_field: id_field,
                    value: value,
                    entity: entity
                })
                    .then(function (newValue) {
                        return res.status(201).json({ 'success': `newValue : ${newValue.id}` })
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'cannot add newValue' })
                    })
            } else {
                return res.status(409).json({ 'error': 'value already exist' })
            }
        })
        .catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify value' })
        });
    },

    // Function to get the values with sequelize
    get: function (req, res) {
       
        /****** PARAMS ******/

        var value = req.body.value;

        /****** CHECK ******/

        if(value == null){
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        else if (value == ""){
            return res.status(400).json({ 'error': 'value is empty' });
        }
        else if(!LETTER_REGEX.test(value)){
            return res.status(400).json({ 'error': `parameter value : ${value} need to have only letter` });
        }

        /****** SEQUELIZE ******/

        // Fetch the table 'field' to retrieve the id associated with the table_name 'customer'
        models.field.findAll({
            attributes: ['id','field'],
            where: {
                table_name: `${value}`
            }
        })
        .then(function (tableNameFound) {
            if (tableNameFound) {

                // Insert in array all id associated with the table_name 'customer'
                for (var i = 0; i < tableNameFound.length; i++) {
                    array_id_table_name.push(tableNameFound[i].id);
                    array_field.push(tableNameFound[i].field);
                }

                // Get the all the customers in table 'value'
                models.value.findAll({
                    attributes: ['id','id_field','value','entity','createdAt'],
                    where: {
                        id_field: array_id_table_name
                    },
                })
                .then(function (customer) {
                    if(customer){
                        
                        for (let i = 0; i < customer.length; i++) {
                            // Get all the entity
                            array_json_entity.push(customer[i].entity);
                        }

                        // Remove the duplicate entity
                        array_json_entity_unique = remove_duplicate_data(array_json_entity);
                     
                        // Group customer together in a json
                        for (let i = 0; i < array_json_entity_unique.length; i++) {
                           for (let j = 0; j < customer.length; j++) {
                               if(customer[j].entity == array_json_entity_unique[i]){

                                    // Get the index of id_table_name in array 'array_id_table_name' 
                                    id_table_name =  array_id_table_name.indexOf(parseInt(customer[j].id_field));

                                    // Create the json of each customer
                                    json[`entity`] = customer[j].entity;
                                    json[`id_field_${array_field[id_table_name]}`] = customer[j].id_field;
                                    json[`id_${array_field[id_table_name]}`] = customer[j].id;
                                    json[`${array_field[id_table_name]}`] = customer[j].value;
                            }
                            }

                            // Create the array of json customers
                            array_json[`${value}_${i}`] = json;
                            
                            // Clear the json
                            json = {};
                        }
                        res.status(200).json(array_json); // Send the json of all customer
                        
                        // Clear all array
                         array_id_table_name       = [];
                         array_field               = [];
                         array_json_entity         = [];
                         array_json_entity_unique  = [];
                         array_json                = {};
                         json                      = {};
                         id_table_name             = 0;
                    }
                    else {
                        res.status(201).json({'error': 'customer not found'});
                    }
                })
                .catch(function (err) {
                    res.status(500).json({'error': 'cannot fetch value'});
                })
            }
            else {
                res.status(201).json({ 'error': 'tableName not found' });
            }
        })
        .catch(function (err) {
            res.status(500).json({ 'error': 'cannot fetch field' });
        })
    },

    // Function to delete the values in 'values' with sequelize
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
  
        models.value.destroy({
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

    // Function to update data in values with sequelize
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
        models.value.update(
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

// Function to remove the duplicate data in array
function remove_duplicate_data(array){
    var uniqueArray = [];
    
    // Loop through array values
    for(i=0; i < array.length; i++){
        if(uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }
    return uniqueArray;
}