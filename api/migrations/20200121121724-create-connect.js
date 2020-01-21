'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('connects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_connect_1: {
        type: Sequelize.INTEGER,
        references: {
          model: 'values',
          key: 'num_entity'
        }
      },
      id_connect_2: {
        type: Sequelize.INTEGER,
        references: {
          model: 'values',
          key: 'num_entity'
        }
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
    return queryInterface.dropTable('connects');
  }
};