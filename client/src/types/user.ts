import { EtownOffice } from './office';

export interface User {
  id: number
  office: EtownOffice | null;
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
