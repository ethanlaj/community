const dotenv = require("dotenv");
dotenv.config();

const { Sequelize } = require("sequelize");
const {
	ModelContact,
	ModelCommunication,
	ModelEtownOffice,
	ModelOrganization,
	ModelOrganizationLocation,
	ModelUser,
} = require("./models");

// create database connection
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
	dialect: "mysql",
	logging: false, // set to true to log SQL queries
});

// initialize models
const Contact = ModelContact(sequelize);
const Communication = ModelCommunication(sequelize);
const EtownOffice = ModelEtownOffice(sequelize);
const Organization = ModelOrganization(sequelize);
const OrganizationLocation = ModelOrganizationLocation(sequelize);
const User = ModelUser(sequelize);

// Define associations
Communication.belongsTo(Organization, { foreignKey: "organizationId" });
Communication.belongsTo(OrganizationLocation, { foreignKey: "locationId" });
Communication.belongsToMany(Contact, { through: "CommunicationContact" });
Communication.belongsToMany(User, { through: "CommunicationUser" });

Contact.belongsToMany(Communication, { through: "CommunicationContact" });
Contact.belongsToMany(Organization, { through: "OrganizationContact" });

EtownOffice.hasMany(User, { foreignKey: "officeId" });

Organization.hasMany(OrganizationLocation, {
	foreignKey: "organizationId",
});
Organization.hasMany(Communication, {
	foreignKey: "organizationId",
});
Organization.belongsToMany(Contact, { through: "OrganizationContact" });

OrganizationLocation.belongsTo(Organization, {
	foreignKey: "organizationId",
});
OrganizationLocation.hasMany(Communication, { foreignKey: "locationId" });

User.belongsTo(EtownOffice, { foreignKey: "officeId" });
User.belongsToMany(Communication, { through: "CommunicationUser" });

// export the database connection and models
module.exports = {
	sequelize,
	Contact,
	Communication,
	EtownOffice,
	Organization,
	OrganizationLocation,
	User,
};
