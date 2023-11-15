import { Transaction } from 'sequelize';
import { CommunicationContacts, CommunicationOrganizations, CommunicationUsers, Communications } from '../database/models';

export async function setContacts(communication: Communications, contactIds: number[], t: Transaction) {
	const currentContacts = await CommunicationContacts.findAll({
		where: {
			CommunicationId: communication.id,
		},
	});
	const mappedCurrentContacts = currentContacts.map((contact) => contact.ContactId);
	
	const contactsToRemove = mappedCurrentContacts
		.filter(id => !contactIds.includes(id));
  
	const destroyPromise = CommunicationContacts.destroy({
		where: {
			CommunicationId: communication.id,
			ContactId: contactsToRemove,
		},
		transaction: t,
	});
  
	const contactsToCreate = contactIds.filter(contactId => !mappedCurrentContacts.includes(contactId));
	const newAssociations = contactsToCreate.map(contactId => ({
		CommunicationId: communication.id,
		ContactId: contactId,
	}));

	const createPromise = CommunicationContacts.bulkCreate(newAssociations, { transaction: t });
	
	return await Promise.all([destroyPromise, createPromise]);
}

export async function setOrganizations(communication: Communications, organizationIds: number[], t: Transaction) {
	const currentOrganizations = await CommunicationOrganizations.findAll({
		where: {
			CommunicationId: communication.id,
		},
	});
	const mappedCurrentOrganizations = currentOrganizations.map((organization) => organization.OrganizationId);

	const organizationsToRemove = mappedCurrentOrganizations
		.filter(id => !organizationIds.includes(id));
  
	const destroyPromise = CommunicationOrganizations.destroy({
		where: {
			CommunicationId: communication.id,
			OrganizationId: organizationsToRemove,
		},
		transaction: t,
	});
	
	const organizationsToCreate = organizationIds.filter(organizationId => !mappedCurrentOrganizations.includes(organizationId));
	const newAssociations = organizationsToCreate.map(organizationId => ({
		CommunicationId: communication.id,
		OrganizationId: organizationId,
	}));

	const createPromise = CommunicationOrganizations.bulkCreate(newAssociations, { transaction: t });
	
	return await Promise.all([destroyPromise, createPromise]);
}

export async function setUsers(communication: Communications, userIds: number[], t: Transaction) {
	const currentUsers = await CommunicationUsers.findAll({
		where: {
			CommunicationId: communication.id,
		},
	});
	const mappedCurrentUsers = currentUsers.map((user) => user.UserId);

	const usersToRemove = mappedCurrentUsers
		.filter(id => !userIds.includes(id));
  
	const destroyPromise = CommunicationUsers.destroy({
		where: {
			CommunicationId: communication.id,
			UserId: usersToRemove,
		},
		transaction: t,
	});
  
	const usersToCreate = userIds.filter(userId => !mappedCurrentUsers.includes(userId));
	const newAssociations = usersToCreate.map(userId => ({
		CommunicationId: communication.id,
		UserId: userId,
	}));

	const createPromise = CommunicationUsers.bulkCreate(newAssociations, { transaction: t });
	
	return await Promise.all([destroyPromise, createPromise]);
}