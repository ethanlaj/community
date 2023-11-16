'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('OrganizationLocations', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('OrganizationLocations', 'deletedAt');
  }
};

