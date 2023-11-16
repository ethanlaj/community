import { Organization } from './organization';

export interface Location {
    id: number;
    organization: Organization;
    organizationId: number;
    name: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}
