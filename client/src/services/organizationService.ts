import http from './httpService';
import config from '../config.js';

const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/organizations`;

interface Organization {
  name: string;
  locations: {
    name: string;
    address: string;
  }[];
  contacts: {
    name: string;
    email: string;
    phone: string;
  }[];
}

export default class OrganizationService {
  static http = http.create();

  static getAll = async () => {
    const response = await http.get(apiEndpoint);
    return response.data;
  };

  static getById = async (id: number) => {
    const response = await http.get(`${apiEndpoint}/${id}`);
    return response.data;
  };

  static create = async (organization: Organization) => {
    const response = await http.post(apiEndpoint, organization);
    return response.data;
  };

  static update = async (id: number, updatedOrganization: string) => {
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
