const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Organization = sequelize.define("Organization", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return Organization;
};
