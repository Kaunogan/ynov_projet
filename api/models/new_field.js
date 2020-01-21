'use strict';
module.exports = (sequelize, DataTypes) => {
  const new_field = sequelize.define('new_field', {
    field: DataTypes.STRING,
    type: DataTypes.STRING,
    nom_table: DataTypes.STRING
  }, {});
  new_field.associate = function(models) {
    // associations can be defined here

  };
  return new_field;
};