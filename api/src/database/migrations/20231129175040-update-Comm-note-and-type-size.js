'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Communications', 'note', {
        type: Sequelize.STRING(1024),
        allowNull: false,
      }),
      queryInterface.changeColumn('Communications', 'type', {
        type: Sequelize.STRING(10),
        allowNull: false,
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Communications', 'note', {
        type: Sequelize.STRING(50),
        allowNull: false,
      }),
      queryInterface.changeColumn('Communications', 'type', {
        type: Sequelize.STRING(50),
        allowNull: false,
      }),
    ]);
  },
};

