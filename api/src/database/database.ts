import { Sequelize } from 'sequelize-typescript';
import { CommunicationContacts, CommunicationUsers, Communications, Contacts, EtownOffices, OrganizationLocations, Organizations, Users, CommunicationOrganizations, OrganizationContacts } from './models';

const isProd = process.env.NODE_ENV === 'production';
const DB_CONNECTION_STRING = isProd
	? process.env.DB_CONNECTION_STRING
	: process.env.LOCALDB_CONNECTION_STRING;

if (!DB_CONNECTION_STRING) {
	throw new Error(`${isProd ? 'DB_CONNECTION_STRING' : 'LOCALDB_CONNECTION_STRING'} is not defined in the environment variables.`);
}

console.log(`Connecting to ${isProd ? 'production' : 'local'} database`);

const sequelize = new Sequelize(DB_CONNECTION_STRING, {
	dialect: 'mysql',
	logging: false,
	modelPaths: [__dirname + './models'],
	models: [Contacts, Communications, Organizations, OrganizationLocations, Users, CommunicationContacts, CommunicationUsers, EtownOffices, CommunicationOrganizations, OrganizationContacts],
});

export default sequelize; 
