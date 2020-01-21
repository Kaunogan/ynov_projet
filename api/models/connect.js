'use strict';
module.exports = (sequelize, DataTypes) => {
  const connect = sequelize.define('connect', {
    id_connect_1: DataTypes.INTEGER,
    id_connect_2: DataTypes.INTEGER
  }, {});
  connect.associate = function(models) {
    // associations can be defined here
    models.connect.hasMany(models.value);

  };
  return connect;
};