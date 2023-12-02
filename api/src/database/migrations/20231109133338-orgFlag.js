'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Organizations', 'flag', {
      type: Sequelize.DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        max: 3,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Organizations', 'flag');
  }
};
