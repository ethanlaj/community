export interface Organization {
    id: number;
    name: string;
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
    aliases: {
        alias: string;
    }[];
}
