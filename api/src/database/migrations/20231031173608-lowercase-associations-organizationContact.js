'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {    
		await queryInterface.renameColumn('OrganizationContacts', 'ContactId', 'contactId');
		await queryInterface.renameColumn('OrganizationContacts', 'OrganizationId', 'organizationId');
	},

	async down(queryInterface) {
		await queryInterface.renameColumn('OrganizationContacts', 'contactId', 'ContactId');
		await queryInterface.renameColumn('OrganizationContacts', 'organizationId', 'OrganizationId');
	}
};
