import http from './httpService';
import { apiUrl } from '../config';
import { UserDTO } from '@/types/user';

const apiEndpoint = `${apiUrl}/users`;

export default class UserService {
  static http = http.create();

  static async getAll() {
    const response = await http.get(apiEndpoint);
    return response.data;
  }

  static async getAllByOfficeId(officeId: number) {
    const response = await http.get(apiEndpoint, { params: { officeId } });
    return response.data;
  }

  static async getById(id: number) {
    const response = await http.get(`${apiEndpoint}/${id}`);
    return response.data;
  }

  static async getMe() {
    const response = await http.get(`${apiEndpoint}/me`);
    return response.data;
  }

  static async create(createUser: UserDTO) {
    const response = await http.post(apiEndpoint, createUser);
    return response.data;
  }

  static async update(id: number, updatedUser: UserDTO) {
    const response = await http.put(`${apiEndpoint}/${id}`, updatedUser);
    return response.data;
  }

  static async delete(id: number) {
    const response = await http.delete(`${apiEndpoint}/${id}`);
    return response.data;
  }
}
