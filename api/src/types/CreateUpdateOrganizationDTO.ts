export interface CreateUpdateOrganizationDTO {
	name: string;
	organizationLocations: CreateUpdateOrganizationLocation[];
	aliases: string[];
}

export interface CreateUpdateOrganizationLocation {
	id?: number;
	name: string;
	address: string;
}
