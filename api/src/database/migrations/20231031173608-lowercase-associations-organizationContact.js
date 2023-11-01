'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Remove primary key constraint
		await queryInterface.removeConstraint('OrganizationContacts', 'PRIMARY');
    
		// Rename the existing columns to temporary names
		await queryInterface.renameColumn('OrganizationContacts', 'ContactId', 'tempContactId');
		await queryInterface.renameColumn('OrganizationContacts', 'OrganizationId', 'tempOrganizationId');
    
		// Add new columns with the desired lowercase names
		await queryInterface.addColumn('OrganizationContacts', 'contactId', {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'Contacts',
				key: 'id'
			}
		});

		await queryInterface.addColumn('OrganizationContacts', 'organizationId', {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'Organizations',
				key: 'id'
			}
		});

		// Copy data from old columns to new ones
		await queryInterface.sequelize.query(`
      UPDATE OrganizationContacts 
      SET contactId = tempContactId, organizationId = tempOrganizationId
    `);

		// Delete the old columns
		await queryInterface.removeColumn('OrganizationContacts', 'tempContactId');
		await queryInterface.removeColumn('OrganizationContacts', 'tempOrganizationId');

		// Now, set the new combined primary key
		await queryInterface.addConstraint('OrganizationContacts', {
			fields: ['contactId', 'organizationId'],
			type: 'primary key'
		});
	},

	async down(queryInterface) {
		// Remove primary key constraint from new columns
		await queryInterface.removeConstraint('OrganizationContacts', 'PRIMARY');

		// Rename the lowercase columns back to their original names
		await queryInterface.renameColumn('OrganizationContacts', 'contactId', 'ContactId');
		await queryInterface.renameColumn('OrganizationContacts', 'organizationId', 'OrganizationId');

		// Set the old columns back as primary key
		await queryInterface.addConstraint('OrganizationContacts', {
			fields: ['ContactId', 'OrganizationId'],
			type: 'primary key'
		});
	}
};
