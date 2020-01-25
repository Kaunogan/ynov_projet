/*
 * Title : fieldCtrl.js
 *
 * Author : GUMBAU Elric, LEMOINE Kaunogan
 * 
 * Date : 25/01/2020
 */

// Imports
var models = require('../models');

// CONSTANT
const NB_REGEX = /^\d+$/;
const LETTER_REGEX = /^[a-zA-Z]+$/;

// Variables
var json = {};
var array_json = {};

// Routes
module.exports = {

    // Function to insert the fields with sequelize
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

    // Function to get the data fields with sequelize
    get:function (req,res) {
    
        /****** PARAMS ******/
        var field = req.body.field;

        /****** CHECK ******/

        if(field == null){
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        else if (field == ""){
            return res.status(400).json({ 'error': 'field is empty' });
        }
        else if(!LETTER_REGEX.test(field)){
            return res.status(400).json({ 'error': `parameter field : ${field} need to have only letter` });
        }

        /****** SEQUELIZE ******/
        models.field.findAll({
            attributes: ['id','field','type','table_name'],
            where:{
                table_name: `${field}`
            }
        })
        .then(function (fieldFound) {
            if (fieldFound) {

                 // Clear array
                 json       = {};
                 array_json = {};

                for (let i = 0; i < fieldFound.length; i++) {
                    json[`id`] = fieldFound[i].id;
                    json[`field`] = fieldFound[i].field;
                    json[`type`] = fieldFound[i].type;
                    json[`table_name`] = fieldFound[i].table_name;
                    array_json[`field_${i}`] = json;
                    json = {};

                }
                return res.status(200).json(array_json);
            }
            else {
                return res.status(409).json({'error': 'field not found'});
            }
        })
        .catch(function (err) {
            return res.status(500).json({'error': 'unable to verify field'});
        })
    },

    // Function to delete data in fields with sequelize
    delete: function (req,res) {

      /****** PARAMS ******/
      var id_field = req.body.id_field;

      /****** CHECK ******/

      if(id_field == null){
          return res.status(400).json({ 'error': 'missing parameters' });
      }
      else if (id_field == ""){
          return res.status(400).json({ 'error': 'field is empty' });
      }
      else if(!NB_REGEX.test(id_field)){
          return res.status(400).json({ 'error': `parameter field : ${id_field} need to have only number` });
      }

      /***** SEQUELIZE ******/

      models.field.destroy({
          where:{
              id: id_field
          }
      })
      .then(function (idField) {
          if(idField){
            res.status(200).json({ "success": "id_field deleted" });
          }
          else {
            res.status(500).json({ "error": "invalid id_field" });
          }
      })
      .catch(function (err) {
        res.status(500).json({ "error": "invalid id_field" });
       });
    },

    // Function to delete data in fields/values with sequelize
    delete_all: function (req,res) {
          
      /****** PARAMS ******/
      var id_field = req.body.id_field;

      /****** CHECK ******/

      if(id_field == null){
          return res.status(400).json({ 'error': 'missing parameters' });
      }
      else if (id_field == ""){
          return res.status(400).json({ 'error': 'field is empty' });
      }
      else if(!NB_REGEX.test(id_field)){
          return res.status(400).json({ 'error': `parameter field : ${id_field} need to have only number` });
      }

      /***** SEQUELIZE ******/

      // Delete data in value

      models.value.destroy({
          where: {
              id_field: id_field
          },
      })
      .then(function (value) {
          if(value){

            // Delete data in field

            models.field.destroy({
                where:{
                    id: id_field
                }
            })
            .then(function (field) {
                if(field){
                    res.status(200).json({ "Success": "value fields/values deleted" });
                }
                else{
                    res.status(404).json({ "error": "no field found" });
                }
            })
            .catch(function (err) {
                res.status(500).json({ "error": "invalid id_field" });
            });

          } 
          else {
            res.status(404).json({ "error": "no value found" });
          }
      })
      .catch(function (err) {
        res.status(500).json({ "error": "invalid id_field" });
       });
    },

    // Function to update data in fields with sequelize
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

      // Update data in fields
      models.field.update(
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