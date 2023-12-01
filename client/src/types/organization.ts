import { Communication } from './communication';

export interface Organization {
    id: number;
    name: string;
    flag: number;
    organizationLocations: {
        id: number;
        name: string;
        address: string;
    }[];
    contacts: {
        name: string;
        email: string;
        phone: string;
    }[];
    communications: Communication[];
    aliases: {
        alias: string;
    }[];
}
