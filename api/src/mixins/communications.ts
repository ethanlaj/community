import { CommunicationContacts, Communications } from '../models';

export async function setContacts(communication: Communications, contactIds: number[]) {
	const contactsToRemove = communication.contacts
		.map((contact) => contact.id)
		.filter(id => !contactIds.includes(id));
  
	const destroyPromise = CommunicationContacts.destroy({
		where: {
			CommunicationId: communication.id,
			ContactId: contactsToRemove,
		},
	});
  
	const newAssociations = contactIds.map(contactId => ({
		CommunicationId: communication.id,
		ContactId: contactId,
	}));

	const createPromise = CommunicationContacts.bulkCreate(newAssociations);
	
	return await Promise.all([destroyPromise, createPromise]);
}
  