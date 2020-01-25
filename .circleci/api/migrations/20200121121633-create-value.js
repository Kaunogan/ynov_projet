'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('values', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_field: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      value: {
        allowNull: true,
        type: Sequelize.STRING
      },
      entity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addIndex('values', ['entity']))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('values');
  },
};