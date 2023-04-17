const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const OrganizationLocation = sequelize.define("OrganizationLocation", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		organizationId: {
			type: DataTypes.INTEGER,
			foreignKey: true,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return OrganizationLocation;
};
