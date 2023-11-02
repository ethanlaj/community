'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('OrganizationAliases', {
			alias: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true
			},
			organizationId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Organizations',
					key: 'id'
				},
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now'),
			}
		});
	},

	async down (queryInterface) {
		await queryInterface.dropTable('OrganizationAliases');
	}
};