const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const EtownOffice = sequelize.define("EtownOffice", {
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

	return EtownOffice;
};
