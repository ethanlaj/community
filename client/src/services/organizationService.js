import http from './httpService';
import config from '../config.js';

const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/organizations`;

class OrganizationService {
  static http = http.create();

  static async getAll() {
    const response = await http.get(apiEndpoint);
    return response.data;
  }

  static async getById(id) {
    const response = await http.get(`${apiEndpoint}/${id}`);
    return response.data;
  }

  static async create(organization) {
    const response = await http.post(apiEndpoint, organization);
    return response.data;
  }

  static async update(id, updatedOrganization) {
    const response = await http.put(`${apiEndpoint}/${id}`, updatedOrganization);
    return response.data;
  }

  static async delete(id) {
    const response = await http.delete(`${apiEndpoint}/${id}`);
    return response.data;
  }
}

const organizationService = new OrganizationService();
export default organizationService;
