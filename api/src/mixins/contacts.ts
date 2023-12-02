import { Transaction } from 'sequelize';
import { Contacts, OrganizationContacts } from '../database/models';
import { CreateUpdateContactDTO } from '../types/ContactDTO';
import { ContactAliases } from '../database/models/contactAliases';

export async function setOrganizations(contact: Contacts, organizations: CreateUpdateContactDTO['organizations'], t: Transaction) {
	const currentOrganizations = await OrganizationContacts.findAll({
		where: {
			contactId: contact.id,
		},
	});

	const currentOrganizationIds = currentOrganizations.map((organization) => organization.organizationId);
	const organizationIds = organizations.map((organization) => organization.id);
	
	const organizationsToRemove = currentOrganizationIds
		.filter(id => !organizationIds.includes(id));
  
	const destroyPromise = OrganizationContacts.destroy({
		where: {
			contactId: contact.id,
			organizationId: organizationsToRemove,
		},
		transaction: t,
	});

	const organizationsToUpdate = currentOrganizations.filter((organization) => organizationIds.includes(organization.organizationId));
	const updatePromises = organizationsToUpdate.map((organization) => {
		const organizationDTO = organizations.find((org) => org.id === organization.organizationId);
		
		return organization.update({
			email: organizationDTO?.email,
			phone: organizationDTO?.phone,
			exten: organizationDTO?.exten,
		}, { transaction: t });
	});
  
	const organizationsToCreate = organizations.filter((organization) => !currentOrganizationIds.includes(organization.id));
	const newAssociations = organizationsToCreate.map((organization) => {
		return {
			contactId: contact.id,
			email: organization.email,
			phone: organization.phone,
			exten: organization.exten,
			organizationId: organization.id,
		};
	});

	const createPromise = OrganizationContacts.bulkCreate(newAssociations, { transaction: t });
	
	return await Promise.all([destroyPromise, updatePromises, createPromise]);
}


export async function setOrganizationByName(contact: Contacts, organizationId: number, organizationData: { name: string, email?: string, phone?: string, exten?: string }, t: Transaction) {
	const existingAssociation = await OrganizationContacts.findOne({
		where: {
			contactId: contact.id,
			organizationId: organizationId,
		},
		transaction: t,
	});
  
	if (existingAssociation) {
		await existingAssociation.update({
			email: organizationData.email,
			phone: organizationData.phone,
			exten: organizationData.exten,
		}, { transaction: t });
	} else {
		await OrganizationContacts.create({
			contactId: contact.id,
			organizationId: organizationId,
			email: organizationData.email,
			phone: organizationData.phone,
			exten: organizationData.exten,
		}, { transaction: t });
	}
}

export async function setAliases(contact: Contacts, aliases: string[], t: Transaction) {
	const currentAliases = await ContactAliases.findAll({
		where: {
			contactId: contact.id,
		},
	});
	
	const aliasesToRemove = currentAliases
		.map((alias) => alias.alias)
		.filter(alias => !aliases.includes(alias));
  
	const destroyPromise = ContactAliases.destroy({
		where: {
			alias: aliasesToRemove,
			contactId: contact.id,
		},
		transaction: t,
	});

	const aliasesToCreate = aliases.filter(alias => !currentAliases.find(currentAlias => currentAlias.alias === alias));
	const createPromise = ContactAliases.bulkCreate(
		aliasesToCreate.map(alias => ({
			alias,
			contactId: contact.id,
		})),
		{ transaction: t }
	);
	
	return await Promise.all([destroyPromise, createPromise]);
}