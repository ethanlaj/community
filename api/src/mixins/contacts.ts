import { Contacts, OrganizationContacts } from '../database/models';

export async function setOrganizations(contact: Contacts, organizationIds: number[], emails: string[], phones: string[]) {
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
		console.log({ contactId:contact.id, email:emails[index], phone:phones[index], organizationId:organizationId });
		return {
			contactId: contact.id,
			email: emails[index], // Use the email at the same index
			phone: phones[index], // Use the phone at the same index
			organizationId: organizationId,
		};
	}
	);
	console.log(newAssociations);

	const createPromise = OrganizationContacts.bulkCreate(newAssociations);
	
	return await Promise.all([destroyPromise, createPromise]);
}