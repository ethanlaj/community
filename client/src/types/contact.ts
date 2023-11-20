import { Communication } from './communication';
import { Organization } from './organization';

export interface Contact {
    id: number;
    first_name: string,
    last_name: string,
    email: string;
    phone: string;
    organizations: Organization[];
    organizationContacts: OrganizationContact[];
    communications: Communication[];
    createdAt: string;
    updatedAt: string;
    aliases: {
      alias: string;
    }[];
}

export interface OrganizationContact {
  contactId: number,
  organizationId: number,
  email: string,
  phone: string,
  exten: string,
}

export interface CreateUpdateContactDTO {
    first_name: string,
    last_name:string,
    organizations:{
      id: number,
      email: string | undefined;
      phone: string | undefined;
      exten: string | undefined;
    }[];
    aliases: string[];
  }

export interface deletedContactIdentifiers {
  contactIdIncoming: number,
  organizationIdIncoming: number,
}
