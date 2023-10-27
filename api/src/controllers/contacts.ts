import express, { Router, Request, Response } from 'express';
import { Op } from 'sequelize';
import { Contacts, Organizations, OrganizationContacts } from '../database/models';
import errorHandler from '../errorHandler';
import { CreateContactDTO } from '../types/CreateContactDTO';
import { setOrganizations } from '../mixins/contacts';

const contactsRouter: Router = express.Router();

contactsRouter.get('/', errorHandler(async (req: Request, res: Response) => {

	try {
		const results = await OrganizationContacts.findAll({
			attributes: ['contactId','email', 'phone','organizationId'],
			include: [
				{
					model: Organizations,
					attributes: ['name'],
				},
				{
					model: Contacts,
					attributes: ['name'],
				},
				
			],
		});
		//console.log(results);
	
		const contactResults = results.map((result) => ({
			name: result.contact? result.contact.name : null,
			email: result.email,
			phone: result.phone,
			organizationName: result.organization ? result.organization.name: null,
			contactId: result.contactId,
			organizationId: result.organizationId,
		}));
	
		console.log(contactResults);
		res.status(200).json(contactResults);
	} catch (error) {
		console.log(error);
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
	const { name , organizations }  = req.body as CreateContactDTO;
	const organizationIds = organizations.map(org => org.id);
	const organizationEmails = organizations.map(org => org.email);
	const organizationPhones = organizations.map(org => org.phone);
	console.log(organizations);

	try {
		const newContact = await Contacts.create({
			name,
		});
		if (organizations) {
			await setOrganizations(newContact, organizationIds, organizationEmails, organizationPhones);
		}
		console.log(newContact);
		res.status(201).json(newContact);
	} catch (error) {
		console.log(error);
		res.status(500).send((error as Error).message);
	}
	
}));

contactsRouter.put('/:id', errorHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, organizations } = req.body;


	//email, phone,

	try {
		const contact = await Contacts.findByPk(id);
		if (!contact) {
			res.status(404).json({ message: 'Contact not found' });
			return;
		}

		contact.name = name || contact.name;
		// contact.email = email || contact.email;
		// contact.phone = phone || contact.phone;
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
