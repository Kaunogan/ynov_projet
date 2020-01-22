// Imports
var models = require('../models');

// Routes
module.exports = {

    // Function to insert the field
    insert: function (req,res) {
        
        //Params
        var field      = req.body.field;
        var type       = req.body.type;
        var table_name = req.body.table_name;

        // Check if params are valid
        if(field == null || type == null || table_name == null){
            return res.status(400).json({'error': 'missing parameters'});
        }

        // Check if field already exist if not insert the data
        models.field.findOne({
            attributes: ['field'],
            where: {field: field}
        })
        .then(function(fieldFound) {
            if(!fieldFound){
                var newField = models.field.create({
                    field: field,
                    type: type,
                    table_name: table_name
                })
                .then(function (newField) {
                    return res.status(201).json({'field_id': newField.id})
                })
                .catch(function (err) {
                    return res.status(500).json({'error': 'cannot add field'})
                })
            } else {
                return res.status(409).json({'error': 'field already exist'})
            }
        })
        .catch(function (err) {
            return res.status(500).json({'error': 'unable to verify field'})
        });
    }
}