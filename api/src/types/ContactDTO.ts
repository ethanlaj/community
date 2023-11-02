export interface CreateContactDTO {
    name: string,
    organizations:{
      id: number,
      email: string;
      phone: string;
    }[];
  }
  
export interface deletedContactIdentifiers {
  contactIdIncoming: number,
  organizationIdIncoming: number,
  }
