import http from './httpService';
import config from '../config.js';

const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/communications`;

export default class CommunicationService {
  static http = http.create();

  static async getAll() {
    const response = await http.get(apiEndpoint);
    return response.data;
  }

  static async getById(id) {
    const response = await http.get(`${apiEndpoint}/${id}`);
    return response.data;
  }

  static async create(communication) {
    const response = await http.post(apiEndpoint, communication);
    return response.data;
  }

  static async update(id, updatedCommunication) {
    const response = await http.put(`${apiEndpoint}/${id}`, updatedCommunication);
    return response.data;
  }

  static async delete(id) {
    const response = await http.delete(`${apiEndpoint}/${id}`);
    return response.data;
  }
}
