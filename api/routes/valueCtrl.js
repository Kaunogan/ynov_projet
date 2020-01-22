// Imports
var models = require('../models');

// Routes
module.exports = {

    // Function to insert the field
    insert: function (req, res) {

        //Params
        var id_field = req.body.id_field;
        var value = req.body.value;
        var entity = req.body.entity;

        // Check if params are valid
        if (id_field == null || value == null || entity == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        // Check if field already exist if not insert the data
        models.value.findOne({
            attributes: ['value', 'entity'],
            where: { 
                value: value,
                entity: entity,
            }
        })
        .then(function (valueFound) {
            if (!valueFound) {
                var newValue = models.value.create({
                    id_field: id_field,
                    value: value,
                    entity: entity
                })
                .then(function (newValue) {
                    return res.status(201).json({ 'new_value_id': newValue.id })
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
    }
}