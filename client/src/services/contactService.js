import http from './httpService';
import config from '../config.js';

const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/contacts`;

export default class ContactService {
  static http = http.create();

  static async getAll() {
    const response = await http.get(apiEndpoint);
    return response.data;
  }

  static async getAllByOrgId(orgId) {
    const response = await http.get(apiEndpoint, { params: { orgId } });
    return response.data;
  }

  static async getById(id) {
    const response = await http.get(`${apiEndpoint}/${id}`);
    return response.data;
  }

  static async create(contact, organizations) {
    const response = await http.post(apiEndpoint, {
      contact,
      organizations,
    });
    return response.data;
  }

  static async update(id, updatedContact) {
    const response = await http.put(`${apiEndpoint}/${id}`, updatedContact);
    return response.data;
  }

  static async delete(id) {
    const response = await http.delete(`${apiEndpoint}/${id}`);
    return response.data;
  }
}
