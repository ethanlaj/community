import http from './httpService';
import { apiUrl } from '../config';

const apiEndpoint = `${apiUrl}/offices`;

export default class officeService {
  static http = http.create();

  static async getAll() {
    const response = await http.get(apiEndpoint);
    return response.data;
  }
}
