'use strict';
module.exports = (sequelize, DataTypes) => {
  const connect = sequelize.define('connect', {
    customer: DataTypes.INTEGER,
    product: DataTypes.INTEGER,
    bill: DataTypes.INTEGER
  }, {});
  connect.associate = function(models) {
    // associations can be defined here
    models.connect.hasMany(models.value);
  };
  return connect;
};