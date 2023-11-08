import http from './httpService';
import config from '../config';
import { User } from '@/types/user';

const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/users`;

export default class UserService {
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

  static async create(createUser: User) {
    const response = await http.post(apiEndpoint, createUser);
    return response.data;
  }

  static async update(id: number, updatedUser: User) {
    const response = await http.put(`${apiEndpoint}/${id}`, updatedUser);
    return response.data;
  }

  static async delete(id: number) {
    const response = await http.delete(`${apiEndpoint}/${id}`);
    return response.data;
  }
}
