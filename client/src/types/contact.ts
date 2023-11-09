import { Organization } from './organization';

export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    organizations: Organization[];
}

export interface CreateContactDTO {
    name: string,
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
