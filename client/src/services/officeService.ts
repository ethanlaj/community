import http from './httpService';
import config from '../config';

interface EtownOffice {
  id: number;
  name: string;
}

const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/offices`;

export default class officeService {
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

  static async create(createOffice: EtownOffice) {
    const response = await http.post(apiEndpoint, createOffice);
    return response.data;
  }

  static async update(id: number, updatedOffice: EtownOffice) {
    const response = await http.put(`${apiEndpoint}/${id}`, updatedOffice);
    return response.data;
  }

  static async delete(id: number) {
    const response = await http.delete(`${apiEndpoint}/${id}`);
    return response.data;
  }
}
