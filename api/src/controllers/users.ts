import express, { Router, Request, Response } from 'express';
import { Users } from '../models';
import errorHandler from '../errorHandler';

const usersRouter: Router = express.Router();

// Post a new user
usersRouter.post('/', errorHandler(async (req: Request, res: Response) => {
	const userData = req.body;
	try {
		const newUser = await Users.create(userData);

		// if the officeId is provided in the request body
		if (req.body.officeId) {
			newUser.officeId = req.body.officeId;
			await newUser.save();
		}

		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
}));

// Delete a user by id
usersRouter.delete('/:id', errorHandler(async (req: Request, res: Response) => {
	const userId = req.params.id;
	try {
		const user = await Users.findByPk(userId);
		if(!user) {
			res.status(404).send('User not found');
		}
		else{
			await user.destroy();
			res.sendStatus(200);
		}
	}
	catch(error) {
		res.status(500).send((error as Error).message);
	}
}));


export default usersRouter;