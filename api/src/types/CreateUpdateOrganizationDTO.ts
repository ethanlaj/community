export interface CreateUpdateOrganizationDTO {
	name: string;
	organizationLocations: CreateUpdateOrganizationLocation[];
	aliases: string[];
	flag?: number;
}

export interface CreateUpdateOrganizationLocation {
	id?: number;
	name: string;
	address: string;
}
