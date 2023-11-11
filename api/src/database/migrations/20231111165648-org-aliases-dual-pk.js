'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('OrganizationAliases', 'PRIMARY');

    await queryInterface.addConstraint('OrganizationAliases', {
      fields: ['alias', 'organizationId'],
      type: 'primary key',
      name: 'PRIMARY'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('OrganizationAliases', 'PRIMARY');

    await queryInterface.addConstraint('OrganizationAliases', {
      fields: ['alias'],
      type: 'primary key',
      name: 'PRIMARY'
    });
  }
};
