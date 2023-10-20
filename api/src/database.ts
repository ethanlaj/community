import { Sequelize } from 'sequelize-typescript';
import { CommunicationContacts, CommunicationUsers, Communications, Contacts, EtownOffices, OrganizationLocations, Organizations, Users } from './models';

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

if (!DB_CONNECTION_STRING) {
	throw new Error('DB_CONNECTION_STRING is not defined in the environment variables.');
}

const sequelize = new Sequelize(DB_CONNECTION_STRING, {
	dialect: 'mysql',
	logging: false,
	modelPaths: [__dirname + './models'],
	models: [Contacts, Communications, Organizations, OrganizationLocations, Users, CommunicationContacts, CommunicationUsers, EtownOffices],
});

export default sequelize ; 
