'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('Organizations', {
      type: 'unique',
      fields: ['name'],
      name: 'unique_orgs_name'
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Organizations', 'unique_orgs_name');
  }
};
