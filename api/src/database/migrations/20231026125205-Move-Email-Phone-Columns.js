'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add columns to the destination table
    await queryInterface.addColumn('OrganizationContacts', 'email', Sequelize.STRING);
    await queryInterface.addColumn('OrganizationContacts', 'phone', Sequelize.STRING);

    // Remove columns from the source table
    await queryInterface.removeColumn('Contacts', 'email');
    await queryInterface.removeColumn('Contacts', 'phone');
  },

  async down(queryInterface, Sequelize) {
// Revert the migration
    // 1. Add columns back to the source table
    await queryInterface.addColumn('Contacts', 'email', Sequelize.STRING);
    await queryInterface.addColumn('Contacts', 'phone', Sequelize.STRING);


    // 3. Remove columns from the destination table
    await queryInterface.removeColumn('OrganizationContacts', 'email');
    await queryInterface.removeColumn('OrganizationContacts', 'phone');
  },
};

