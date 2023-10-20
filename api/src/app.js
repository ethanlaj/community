"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const database_1 = __importDefault(require("./database"));
const errorHandler_1 = __importDefault(require("./errorHandler"));
const health_1 = __importDefault(require("./controllers/health"));
const contacts_1 = __importDefault(require("./controllers/contacts"));
const organizations_1 = __importDefault(require("./controllers/organizations"));
const locations_1 = __importDefault(require("./controllers/locations"));
const communications_1 = __importDefault(require("./controllers/communications"));
const app = (0, express_1.default)();
database_1.default
    .sync({ force: false })
    .then(() => {
    console.log('Database synced successfully.');
})
    .catch((err) => {
    console.error('Unable to sync database:', err);
});
app.use(cors());
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', health_1.default);
app.use('/contacts', contacts_1.default);
app.use('/organizations', organizations_1.default);
app.use('/locations', locations_1.default);
app.use('/communications', communications_1.default);
app.use(errorHandler_1.default);
module.exports = app;
