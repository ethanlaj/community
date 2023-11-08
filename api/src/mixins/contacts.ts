import { Contacts, OrganizationContacts } from '../database/models';

export async function setOrganizations(contact: Contacts, organizationIds: number[], emails: string[], phones: string[], extens: string[]) {
	const currentOrganizations = await OrganizationContacts.findAll({
		where: {
			contactId: contact.id,
		},
	});
	
	const organizationsToRemove = currentOrganizations
		.map((organization) => organization.id)
		.filter(id => !organizationIds.includes(id));
  
	const destroyPromise = OrganizationContacts.destroy({
		where: {
			contactId: contact.id,
			organizationId: organizationsToRemove,
		},
	});
  
	// Create new associations with the corresponding emails and phones for each organization
	const newAssociations = organizationIds.map((organizationId, index) => {
		
		return {
			contactId: contact.id,
			email: emails[index], // Use the email at the same index
			phone: phones[index], // Use the phone at the same index
			exten: extens[index], // Use the exten at the same index
			organizationId: organizationId,
		};
	}
	);

	const createPromise = OrganizationContacts.bulkCreate(newAssociations);
	
	return await Promise.all([destroyPromise, createPromise]);
}