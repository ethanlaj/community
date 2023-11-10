import express, { Router, Request, Response } from 'express';
import { Op } from 'sequelize';
import { Contacts, Organizations, OrganizationContacts } from '../database/models';
import errorHandler from '../errorHandler';
import { CreateContactDTO } from '../types/ContactDTO';
import { setOrganizations } from '../mixins/contacts';
import { ContactAliases } from '../database/models/contactAliases';

const contactsRouter: Router = express.Router();

contactsRouter.get('/', errorHandler(async (req: Request, res: Response) => {

	try {
		const results = await OrganizationContacts.findAll({
			attributes: ['contactId','email', 'phone','organizationId', 'exten'],
			include: [
				{
					model: Organizations,
					attributes: ['name'],
				},
				{
					model: Contacts,
					attributes: ['name'],
					include: [ContactAliases]
				},
			],
		});
	
		const contactResults = results.map((result) => ({
			name: result.contact? result.contact.name : null,
			email: result.email,
			phone: result.phone,
			exten: result.exten,
			organizationName: result.organization ? result.organization.name: null,
			contactId: result.contactId,
			organizationId: result.organizationId,
			aliases: result.contact ? result.contact.aliases : null,
		}));
	
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
	const { name , organizations, aliases }  = req.body as CreateContactDTO;
	const organizationIds = organizations.map(org => org.id);
	const organizationEmails = organizations.map(org => org.email);
	const organizationPhones = organizations.map(org => org.phone);
	const organizationExtens = organizations.map(org => org.exten);


	try {
		const newContact = await Contacts.create({
			name,
		});
		if (organizations) {
			await setOrganizations(newContact, organizationIds, organizationEmails, organizationPhones, organizationExtens);
		}

		if (aliases) {
			await ContactAliases.bulkCreate(
				aliases.map((alias: string) => ({ 
					alias,
					contactId: newContact.id,
				}))
			);
		}

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

contactsRouter.delete('/:conId/:orgId', errorHandler(async (req: Request, res: Response) => {
	
	const { conId,orgId } = req.params;
	try {
		
		await OrganizationContacts.destroy({
			where: {
				contactId: conId,
				organizationId: orgId,
			},
		});

		// Check if there are any organizationContacts associated with the contact
		const organizationContactsCount = await OrganizationContacts.count({
			where: {
				contactId: conId,
			},
		});

		if (organizationContactsCount === 0) {
			// If no organization contacts are associated, delete the contact
			
			await Contacts.destroy({
				where: {
					id:conId,
				},
			});
		}
		res.status(204).json();
	} catch (error) {
		console.log('ERROR: ' + error);
		res.status(500).send((error as Error).message);
		return;
	}
}));

export default contactsRouter;
