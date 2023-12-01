import express, { Router, Request, Response } from 'express';
import { Contacts, Organizations, OrganizationContacts, Communications } from '../database/models';
import errorHandler from '../errorHandler';
import { CreateUpdateContactDTO } from '../types/ContactDTO';
import { setAliases, setOrganizations } from '../mixins/contacts';
import { ContactAliases } from '../database/models/contactAliases';
import isAuthorized from '../middleware/isAuthorized';
import { OrganizationAliases } from '../database/models/organizationAliases';

const contactsRouter: Router = express.Router();


contactsRouter.get('/', isAuthorized(1), errorHandler(async (req: Request, res: Response) => {

	try {
		const contacts = await Contacts.findAll({
			attributes: ['id', 'first_name', 'last_name', 'name'],
			include: [
				{
					model: Organizations,
					attributes: ['name','id'],
				},
				ContactAliases,
			],
		});
	
		res.status(200).json(contacts);
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
}));



contactsRouter.get('/getbyOrg', isAuthorized(1), errorHandler(async (req: Request, res: Response) => {
	try {
		const results = await OrganizationContacts.findAll({
			attributes: ['contactId', 'email', 'phone', 'organizationId', 'exten'],
			include: [
				{
					model: Organizations,
					attributes: ['name'],
					include: [OrganizationAliases]
				},
				{
					model: Contacts,
					attributes: ['first_name', 'last_name'],
					include: [ContactAliases]
				},
			],
		});

		const contactResults = results.map((result) => {
			const organizationName = result.organization ? result.organization.name : null;
			const organizationAliases = result.organization ? result.organization.aliases : null;
			const contactAliases = result.contact ? result.contact.aliases : null;

			const organizationAliasList = organizationAliases ? organizationAliases.map(alias => alias.alias) : [''];
			const contactAliasList = contactAliases ? contactAliases.map(alias => alias.alias) : [''];

			const combinedAliasList = organizationAliasList.concat(contactAliasList);

			return {
				first_name: result.contact ? result.contact.first_name : null,
				last_name: result.contact ? result.contact.last_name : null,
				email: result.email,
				phone: result.phone,
				exten: result.exten,
				organizationName: organizationName,
				aliases: combinedAliasList, // Combine organizationAlias and contactAlias into one alias
				contactId: result.contactId,
				organizationId: result.organizationId,
			};
		});

		res.status(200).json(contactResults);
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
}));



contactsRouter.get('/:id', isAuthorized(1), errorHandler(async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const contact = await Contacts.findByPk(id, {
			include: [Organizations, ContactAliases, OrganizationContacts, Communications],
		});

		if (!contact) {
			res.status(404).json({ message: 'Contact not found' });
		} else {
			res.status(200).json(contact);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send((error as Error).message);
	}
}));

contactsRouter.post('/', isAuthorized(2), errorHandler(async (req: Request, res: Response) => {
	const { first_name, last_name, organizations, aliases }  = req.body as CreateUpdateContactDTO;

	const t = await OrganizationContacts.sequelize!.transaction();

	try {
		const newContact = await Contacts.create({
			first_name: first_name,
			last_name: last_name,
		});
		if (organizations) {
			await setOrganizations(newContact, organizations, t);
		}

		if (aliases) {
			await setAliases(newContact, aliases, t);
		}

		await t.commit();
		res.status(201).json(newContact);
	} catch (error) {
		await t.rollback();
		res.status(500).send((error as Error).message);
	}
	
}));

contactsRouter.put('/:id', isAuthorized(2), errorHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	const { first_name, last_name , organizations, aliases }  = req.body as CreateUpdateContactDTO;

	const t = await OrganizationContacts.sequelize!.transaction();

	try {
		const contact = await Contacts.findByPk(id);
		if (!contact) {
			res.status(404).json({ message: 'Contact not found' });
			return;
		}

		if (organizations) {
			await setOrganizations(contact, organizations, t);
		}

		if (aliases) {
			await setAliases(contact, aliases, t);
		}
		
		await contact.update({
			first_name: first_name,
			last_name: last_name,
		}, { transaction: t });

		await t.commit();
		res.status(200).json(contact);
	} catch (error) {
		await t.rollback();
		res.status(500).send((error as Error).message);
	}
}));

contactsRouter.delete('/:conId/:orgId', isAuthorized(3), errorHandler(async (req: Request, res: Response) => {
	
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
		res.status(500).send((error as Error).message);
		return;
	}
}));

export default contactsRouter;
