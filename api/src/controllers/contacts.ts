import express, { Router, Request, Response } from 'express';
import { Op } from 'sequelize';
import { Contacts, Organizations, OrganizationContacts } from '../database/models';
import errorHandler from '../errorHandler';
import { CreateContactDTO, deletedContactIdentifiers } from '../types/ContactDTO';
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
	
		//console.log(contactResults);
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
	console.log(req.params);
	const { id } = req.params;
	console.log(id);
	const { contactIdIncoming, organizationIdIncoming } = constructContactIdentifiers(id);
	console.log(contactIdIncoming +'FOR Org '+ organizationIdIncoming);
	console.log('Start Remove');
	try {
		
		OrganizationContacts.destroy({
			where: {
				contactId: contactIdIncoming,
				organizationId: organizationIdIncoming,
			},
		});
		console.log(OrganizationContacts);
		await OrganizationContacts.destroy();
		// Check if there are any organizationContacts associated with the contact
		const organizationContactsCount = await OrganizationContacts.count({
			where: {
				contactId: contactIdIncoming,
			},
		});

		console.log('Number Contacts: '+organizationContactsCount);
		if (organizationContactsCount === 0) {
			// If no organization contacts are associated, delete the contact
			
			await Contacts.destroy({
				where: {
					contactIdIncoming,
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

function constructContactIdentifiers(id: string): deletedContactIdentifiers {
	const [contactIdIncoming, organizationIdIncoming] = id.split('_'); // Assuming id is in the format "contactId_organizationId"
	return {
		contactIdIncoming: parseInt(contactIdIncoming, 10),
		organizationIdIncoming: parseInt(organizationIdIncoming, 10),
	};
}

export default contactsRouter;
