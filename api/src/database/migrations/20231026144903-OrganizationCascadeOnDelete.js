'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface) {
		await queryInterface.sequelize.query(`
      ALTER TABLE Communications 
      DROP FOREIGN KEY communications_ibfk_1;
    `);

		await queryInterface.sequelize.query(`
      ALTER TABLE Communications
      ADD CONSTRAINT communications_ibfk_1
      FOREIGN KEY (locationId) REFERENCES OrganizationLocations(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
	},

	async down (queryInterface) {
		await queryInterface.sequelize.query(`
      ALTER TABLE Communications 
      DROP FOREIGN KEY communications_ibfk_1;
    `);

		await queryInterface.sequelize.query(`
      ALTER TABLE Communications
      ADD CONSTRAINT communications_ibfk_1
      FOREIGN KEY (locationId) REFERENCES OrganizationLocations(id)
      ON DELETE NO ACTION ON UPDATE CASCADE;
    `);
	}
};
