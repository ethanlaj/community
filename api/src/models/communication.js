const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Communication = sequelize.define('Communication', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		locationId: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		note: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});

	return Communication;
};
