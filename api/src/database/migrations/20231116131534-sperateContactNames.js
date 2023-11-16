'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Contacts', 'first_name', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Contacts', 'last_name', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Assuming that 'contact_name' is the existing column to be split
    // You may need to adjust the actual column name based on your schema

    // Populate the new 'first_name' and 'last_name' columns from the existing 'contact_name' data
    const records = await queryInterface.sequelize.query(
      'SELECT id, name FROM Contacts',
      { type: Sequelize.QueryTypes.SELECT }
    );

    for (const record of records) {
      const names = record.contact_name.split(' ');
      await queryInterface.sequelize.query(
        `UPDATE Contacts SET first_name = '${names[0]}', last_name = '${names[1] || ''}' WHERE id = ${record.id}`
      );
    }

    // Remove the old 'contact_name' column
    await queryInterface.removeColumn('Contacts', 'name');
  },

  down: async (queryInterface, Sequelize) => {
    // Add back the 'contact_name' column
    await queryInterface.addColumn('Contacts', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Combine 'first_name' and 'last_name' back into 'contact_name'
    const records = await queryInterface.sequelize.query(
      'SELECT id, first_name, last_name FROM Contacts',
      { type: Sequelize.QueryTypes.SELECT }
    );

    for (const record of records) {
      const fullName = `${record.first_name} ${record.last_name}`.trim();
      await queryInterface.sequelize.query(
        `UPDATE Contacts SET contact_name = '${fullName}' WHERE id = ${record.id}`
      );
    }

    // Remove the 'first_name' and 'last_name' columns
    await queryInterface.removeColumn('Contacts', 'first_name');
    await queryInterface.removeColumn('Contacts', 'last_name');
  },
};
