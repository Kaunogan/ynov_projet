/*
 * Title : fieldCtrl.js
 *
 * Author : GUMBAU Elric, LEMOINE Kaunogan
 * 
 * Date : 23/01/2020
 */

// Imports
var models = require('../models');

// CONSTANT
const LETTER_REGEX = /^[a-zA-Z]+$/;

// Variables
var json = {};

// Routes
module.exports = {

    // Function to insert the field with sequelize
    insert: function (req,res) {
        
        /****** PARAMS ******/

        var field      = req.body.field;
        var type       = req.body.type;
        var table_name = req.body.table_name;

        /****** CHECK ******/

        // Check if params are valid
        if(field == null || type == null || table_name == null){
            return res.status(400).json({'error': 'missing parameters'});
        } 
        else if(field == "" || type == "" ||table_name == ""){
            return res.status(400).json({'error': 'parameters empty'});
        }
       
        /****** SEQUELIZE ******/

        // Use Sequelize to check if field already exist if not insert the data
        models.field.findOne({
            attributes: ['field'],
            where: {field: field}
        })
        .then(function(fieldFound) {
            if(!fieldFound){ // if field was not found, insert the data
                var newField = models.field.create({
                    field: field,
                    type: type,
                    table_name: table_name
                })
                .then(function (newField) {
                    return res.status(201).json({'success': `newField : ${newField.id}`});
                })
                .catch(function (err) {
                    return res.status(500).json({'error': 'cannot add field'});
                })
            } else {
                return res.status(409).json({'error': 'field already exist'});
            }
        })
        .catch(function (err) {
            return res.status(500).json({'error': 'unable to verify field'});
        });
    },

    // Function to get the data field
    get:function (req,res) {
    
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
        models.field.findAll({
            attributes: ['field'],
            where:{
                table_name: `${value}`
            }
        })
        .then(function (fieldFound) {
            if (fieldFound) {

                 // Clear array
                 json = {};

                for (let i = 0; i < fieldFound.length; i++) {
                    json[`field_${value}_${i}`] = fieldFound[i].field;
                }

               

                return res.status(201).json(json);
                
            }
            else {
                return res.status(409).json({'error': 'field not found'});
            }
        })
        .catch(function (err) {
            return res.status(500).json({'error': 'unable to verify field'});
        })


    }
}