import { Sequelize } from 'sequelize-typescript';
import Contacts from './models/contact';
import Communications from './models/communication';
import Organizations from './models/organization';
import OrganizationLocations from './models/organizationLocation';
import Users from './models/user';
import CommunicationContacts from './models/communicationContact';
import CommunicationUsers from './models/communicationUser';
import EtownOffices from './models/etownOffice';

const dotenv = require('dotenv');
dotenv.config();

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
console.log('db', DB_CONNECTION_STRING);

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
