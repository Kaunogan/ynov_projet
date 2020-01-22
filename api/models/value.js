'use strict';
module.exports = (sequelize, DataTypes) => {
  const value = sequelize.define('value', {
    id_field: DataTypes.INTEGER,
    value: DataTypes.STRING,
    entity: DataTypes.INTEGER
  }, {});
  value.associate = function(models) {
    // associations can be defined here
    models.value.hasMany(models.field);
  };
  return value;
};