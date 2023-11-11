import express, { Router, Request, Response } from 'express';
import { EtownOffices } from '../database/models';
import errorHandler from '../errorHandler';
import isAuthorized from '../middleware/isAuthorized';

const officesRouter: Router = express.Router();

officesRouter.get('/', isAuthorized(1), errorHandler(async (req: Request, res: Response) => {
	try {
		const users = await EtownOffices.findAll();

		res.status(200).json(users);
	} 
	catch (error) {
		res.status(500).send((error as Error).message);
	}
}));

export default officesRouter;