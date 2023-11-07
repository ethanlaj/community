import { EtownOffice } from './office';

export interface User {
    office: EtownOffice|null;
    permissionLevel: string;
    email: string;
    name: string;
  }
