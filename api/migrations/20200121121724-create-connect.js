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
      customer: {
        type: Sequelize.INTEGER,
        references: {
          model: 'values',
          key: 'entity'
        }
      },
      product: {
        type: Sequelize.INTEGER,
        references: {
          model: 'values',
          key: 'entity'
        }
      },
      bill: {
        type: Sequelize.INTEGER,
        references: {
          model: 'values',
          key: 'entity'
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