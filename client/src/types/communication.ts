import { Contact } from './contact';
import { Location } from './location';
import { Organization } from './organization';
import { User } from './user';

export interface Communication {
    id: number;
    date: string;
    type: string;
    note: string;
    locationId: number | null;
    organizationLocation: Location;
    contacts: Contact[];
    organizations: Organization[];
    users: User[];
}
