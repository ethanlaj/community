import { Organization } from './organization';

export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    organizations: Organization[];
}
