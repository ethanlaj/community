export interface CreateContactDTO {
    name: string,
    aliases: string[];
    organizations:{
      id: number,
      email: string;
      phone: string;
      exten: string;
    }[];
  }
  
export interface deletedContactIdentifiers {
  contactIdIncoming: number,
  organizationIdIncoming: number,
  }

