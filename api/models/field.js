'use strict';
module.exports = (sequelize, DataTypes) => {
  const field = sequelize.define('field', {
    field: DataTypes.STRING,
    type: DataTypes.STRING,
    table_name: DataTypes.STRING
  }, {});
  field.associate = function(models) {
    // associations can be defined here
  };
  return field;
};