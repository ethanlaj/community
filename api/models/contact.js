const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Contact = sequelize.define("Contact", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING(15),
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING(45),
			allowNull: true,
		},
	});

	return Contact;
};
