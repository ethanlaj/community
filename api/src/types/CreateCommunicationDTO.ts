export interface CreateCommunicationDTO {
	date: string;
	type: string;
	contactIds: number[];
	userIds: number[];
	note: string;
	locationId: number | undefined;
	organizationIds: number[];
}
