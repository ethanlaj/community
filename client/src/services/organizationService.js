import http from './httpService';
import config from '../config.js';

const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/organizations`;

export default class OrganizationService {
  static http = http.create();

  static getAll = async () => {
    const response = await http.get(apiEndpoint);
    return response.data;
  };

  static getById = async (id) => {
    const response = await http.get(`${apiEndpoint}/${id}`);
    return response.data;
  };

  static create = async (organization) => {
    const response = await http.post(apiEndpoint, organization);
    return response.data;
  };

  static update = async (id, updatedOrganization) => {
    const response = await http.put(`${apiEndpoint}/${id}`, updatedOrganization);
    return response.data;
  };

  static deleteOrganization = async (id) => {
    const response = await http.delete(`${apiEndpoint}/${id}`);
    return response.data;
  };
}