import express from 'express';
import path from 'path';
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

import sequelize from './database';
import errorHandler from './errorHandler';

import healthRouter from './controllers/health';
import contactsRouter from'./controllers/contacts';
import organizationsRouter from './controllers/organizations';
import locationsRouter from './controllers/locations';
import communicationsRouter from './controllers/communications';

const app = express();

sequelize
	.sync({ force: false })
	.then(() => {
		console.log('Database synced successfully.');
	})
	.catch((err) => {
		console.error('Unable to sync database:', err);
	});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', healthRouter);
app.use('/contacts', contactsRouter);
app.use('/organizations', organizationsRouter);
app.use('/locations', locationsRouter);
app.use('/communications', communicationsRouter);

app.use(errorHandler);

module.exports = app;
