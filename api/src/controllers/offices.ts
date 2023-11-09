import express, { Router, Request, Response } from 'express';
import { EtownOffices } from '../database/models';
import errorHandler from '../errorHandler';

const officesRouter: Router = express.Router();

// Get all users
officesRouter.get('/', errorHandler(async (req: Request, res: Response) => {
	try {
		const users = await EtownOffices.findAll();

		res.status(200).json(users);
	} 
	catch (error) {
		res.status(500).send((error as Error).message);
	}
}));

export default officesRouter;