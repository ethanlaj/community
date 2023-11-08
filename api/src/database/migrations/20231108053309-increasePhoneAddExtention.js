'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn('OrganizationContacts', 'phone', {
			type: Sequelize.STRING(15),
			allowNull: true,
		});

		await queryInterface.addColumn('OrganizationContacts', 'exten',{
			type:Sequelize.STRING(5),
			allowNull:true
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn('yourTableName', 'phone', {
			type: Sequelize.STRING(10),
			allowNull: true,
		});
		await queryInterface.removeColumn('OrganizationContacts', 'exten');
	},
};
