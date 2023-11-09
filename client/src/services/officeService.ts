import http from './httpService';
import config from '../config';

const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/offices`;

export default class officeService {
  static http = http.create();

  static async getAll() {
    const response = await http.get(apiEndpoint);
    return response.data;
  }
}
