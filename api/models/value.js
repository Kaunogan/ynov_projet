'use strict';
module.exports = (sequelize, DataTypes) => {
  const value = sequelize.define('value', {
    id_new_field: DataTypes.INTEGER,
    value: DataTypes.STRING,
    num_entity: DataTypes.INTEGER
  }, {});
  value.associate = function(models) {
    // associations can be defined here
    models.value.hasMany(models.new_field);
  };
  return value;
};