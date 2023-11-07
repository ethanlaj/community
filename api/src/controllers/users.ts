import express, { Router, Request, Response } from 'express';
import { EtownOffices, Users } from '../database/models';
import errorHandler from '../errorHandler';

const usersRouter: Router = express.Router();

// Get all users
usersRouter.get('/', errorHandler(async (req: Request, res: Response) => {
	const officeId = req.query.officeId as string | undefined;

	try {
		const users = await Users.findAll({
			include: {
				model: EtownOffices,
				where: officeId ? { id: officeId } : {},
				required: officeId ? true : false,
			},
		});

		res.status(200).json(users);
	} 
	catch (error) {
		res.status(500).send((error as Error).message);
	}
}));

// Get user by Id
usersRouter.get('/:id', errorHandler(async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const user = await Users.findByPk(id, {
			include: EtownOffices
		});

		if (!user) {
			res.status(404).json({ message: 'User not found' });
		} 
		else {
			res.status(200).json(user);
		}
	} 
	catch (error) {
		res.status(500).send((error as Error).message);
	}
}));

// Post a new user
usersRouter.post('/', errorHandler(async (req: Request, res: Response) => {
	const userData = req.body;
	try {
		const newUser = await Users.create(userData);

		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
}));

// Update a user using Id
usersRouter.put('/:id', errorHandler(async (req: Request, res: Response) => {
	const userId = req.params.id;
	const userData = req.body;

	try {
		const user = await Users.findByPk(userId);
		if (!user) {
			res.status(404).send('User not found');
		}
		else {
			await user.update(userData);
			res.status(201).json(user);
		}
	}
	catch (error) {
		res.status(500).send((error as Error).message);
	}
}));

// Delete a user by id
usersRouter.delete('/:id', errorHandler(async (req: Request, res: Response) => {
	const userId = req.params.id;
	try {
		const user = await Users.findByPk(userId);
		if (!user) {
			res.status(404).send('User not found');
		}
		else {
			await user.destroy();
			res.sendStatus(200);
		}
	}
	catch (error) {
		res.status(500).send((error as Error).message);
	}
}));


export default usersRouter;