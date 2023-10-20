import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import sequelize from './database';
import errorHandler from './errorHandler';

import healthRouter from './controllers/health';
import contactsRouter from'./controllers/contacts';
import organizationsRouter from './controllers/organizations';
import locationsRouter from './controllers/locations';
import communicationsRouter from './controllers/communications';
import usersRouter from './controllers/users';

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
app.use('/users', usersRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});