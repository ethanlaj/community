"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ContactAliases", {
      alias: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      contactId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE ContactAliases
      ADD CONSTRAINT contacts_ibfk_1
      FOREIGN KEY (contactId) REFERENCES Contacts(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("ContactAliases");
  },
};
