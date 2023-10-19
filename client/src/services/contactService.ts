/* eslint-disable linebreak-style */
import http from './httpService';
import config from '../config';

interface CreateContactDTO {
  name: string,
  email: string,
  phone: string,
  exten: string;
  locationIds: number[];
}

const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/contacts`;

export default class ContactService {
  static http = http.create();

  static async getAll() {
    const response = await http.get(apiEndpoint);
    return response.data;
  }

  static async getAllByOrgId(orgId: number) {
    const response = await http.get(apiEndpoint, { params: { orgId } });
    return response.data;
  }

  static async getById(id: number) {
    const response = await http.get(`${apiEndpoint}/${id}`);
    return response.data;
  }

  static async create(createContactDTO: CreateContactDTO) {
    console.log('Org Contact Service')
    const response = await http.post(apiEndpoint, {
      createContactDTO,
    });
    return response.data;
  }

  static async update(id: number, updatedContact: string) {
    const response = await http.put(`${apiEndpoint}/${id}`, updatedContact);
    return response.data;
  }

  static async delete(id: number) {
    const response = await http.delete(`${apiEndpoint}/${id}`);
    return response.data;
  }
}
