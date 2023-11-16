export interface CreateContactDTO {
    first_name: string,
    last_name:string,
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

