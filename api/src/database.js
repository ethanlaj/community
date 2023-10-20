"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const contact_1 = __importDefault(require("./models/contact"));
const communication_1 = __importDefault(require("./models/communication"));
const organization_1 = __importDefault(require("./models/organization"));
const organizationLocation_1 = __importDefault(require("./models/organizationLocation"));
const user_1 = __importDefault(require("./models/user"));
const communicationContact_1 = __importDefault(require("./models/communicationContact"));
const communicationUser_1 = __importDefault(require("./models/communicationUser"));
const etownOffice_1 = __importDefault(require("./models/etownOffice"));
const dotenv = require('dotenv');
dotenv.config();
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
console.log('db', DB_CONNECTION_STRING);
if (!DB_CONNECTION_STRING) {
    throw new Error('DB_CONNECTION_STRING is not defined in the environment variables.');
}
const sequelize = new sequelize_typescript_1.Sequelize(DB_CONNECTION_STRING, {
    dialect: 'mysql',
    logging: false,
    modelPaths: [__dirname + './models'],
    models: [contact_1.default, communication_1.default, organization_1.default, organizationLocation_1.default, user_1.default, communicationContact_1.default, communicationUser_1.default, etownOffice_1.default],
});
exports.default = sequelize;
