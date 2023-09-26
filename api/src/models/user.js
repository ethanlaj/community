const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		officeId: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		permissionLevel: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	return User;
};
