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
      id_new_field: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'new_fields',
          key: 'id'
        }
      },
      value: {
        allowNull: true,
        type: Sequelize.STRING
      },
      num_entity: {
        allowNull: false,
        unique:true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('values');
  }
};