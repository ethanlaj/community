import express, { Router, Request, Response } from 'express';
import { Op } from 'sequelize';
import { Contacts, Organizations } from '../models';
import errorHandler from '../errorHandler';

const contactsRouter: Router = express.Router();

contactsRouter.get('/', errorHandler(async (req: Request, res: Response) => {
	const orgId = req.query.orgId as string | undefined;

	try {
		const contacts = await Contacts.findAll({
			include: {
				model: Organizations,
				where: orgId ? { id: orgId } : {},
				required: orgId ? true : false,
			},
		});

		res.status(200).json(contacts);
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
}));

contactsRouter.get('/:id', errorHandler(async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const contact = await Contacts.findByPk(id, {
			include: Organizations,
		});

		if (!contact) {
			res.status(404).json({ message: 'Contact not found' });
		} else {
			res.status(200).json(contact);
		}
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
}));

contactsRouter.post('/', errorHandler(async (req: Request, res: Response) => {
	const { name, email, phone, organizations } = req.body;

	try {
		const newContact = await Contacts.create({
			name,
			email,
			phone,
		});

		if (organizations && organizations.length > 0) {
			const orgs = await Organizations.findAll({
				where: {
					id: {
						[Op.in]: organizations,
					},
				},
			});

			await newContact.$set('organizations', orgs);
		}

		res.status(201).json(newContact);
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
}));

contactsRouter.put('/:id', errorHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, email, phone, organizations } = req.body;

	try {
		const contact = await Contacts.findByPk(id);
		if (!contact) {
			res.status(404).json({ message: 'Contact not found' });
			return;
		}

		contact.name = name || contact.name;
		contact.email = email || contact.email;
		contact.phone = phone || contact.phone;
		await contact.save();

		if (organizations) {
			const orgs = await Organizations.findAll({
				where: {
					id: {
						[Op.in]: organizations,
					},
				},
			});

			await contact.$set('organizations', orgs);
		}

		res.status(200).json(contact);
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
}));

contactsRouter.delete('/:id', errorHandler(async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const contact = await Contacts.findByPk(id);
		if (!contact) {
			res.status(404).json({ message: 'Contact not found' });
			return;
		}

		await contact.destroy();
		res.status(204).json();
	} catch (error) {
		res.status(500).send((error as Error).message);
		return;
	}
}));

export default contactsRouter;
