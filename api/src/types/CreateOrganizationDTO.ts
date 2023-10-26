export interface CreateOrganizationDTO {
	name: string;
	locations: {
		name: string;
		address: string;
	}[];
	aliases: string[];
}
