import http from './httpService';
import { apiUrl } from '../config';
import { Organization } from '@/types/organization';

const apiEndpoint = `${apiUrl}/organizations`;

interface CreateUpdateOrganizationDTO {
  name: string;
  organizationLocations: {
    id?: number;
    name: string;
    address: string;
  }[];
  aliases: string[];
}

export default class OrganizationService {
  static http = http.create();

  static getAll = async () => {
    const response = await http.get(apiEndpoint);
    return response.data;
  };

  static getById = async (id: number): Promise<Organization> => {
    const response = await http.get(`${apiEndpoint}/${id}`);
    return response.data;
  };

  static getbyName = async (name: string): Promise<Organization> => {
    const response = await http.get(`${apiEndpoint}/name/${name}`);
    return response.data;
  };

  static create = async (organization: CreateUpdateOrganizationDTO) => {
    const response = await http.post(apiEndpoint, organization);
    return response.data;
  };

  static createBulk = async (organizations: CreateUpdateOrganizationDTO[]) => {
    try {
      const response = await http.post(`${apiEndpoint}/bulk`, organizations);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  static update = async (id: number, updatedOrganization: CreateUpdateOrganizationDTO) => {
    const response = await http.put(
      `${apiEndpoint}/${id}`,
      updatedOrganization,
    );
    return response.data;
  };

  static deleteOrganization = async (id: number) => {
    const response = await http.delete(`${apiEndpoint}/${id}`);
    return response.data;
  };
}
