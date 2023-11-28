import { EtownOffice } from './office';

export interface User {
  id: number | undefined;
  office: EtownOffice | null;
  permissionLevel: string;
  email: string;
  name: string;
}

export interface UserDTO{
  id: number | undefined;
  officeId: number;
  permissionLevel: string;
  email: string;
  name: string;
}

export interface ComUser{
  id: number;
  name: string;
}
