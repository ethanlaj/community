import { EtownOffice } from './office';

export interface User {
    office: EtownOffice|null;
    permissionLevel: string;
    email: string;
    name: string;
}

export interface UserDTO{
  officeId: number;
  permissionLevel: string;
  email: string;
  name: string;
}

export interface ComUser{
  id: number;
  name: string;
}
