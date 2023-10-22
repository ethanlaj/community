import http from './httpService';
import { apiUrl } from '../config';

const apiEndpoint = `${apiUrl}/communications`;

interface Communication {
  date: string;
  contacts: {
    name: string;
    email: string;
    phone: string;
  }[];
  users: {
    name: string;
    email: string;
    phone: string;
  }[];
  note: string;
  locationId: string | undefined;
  organization: {
    id: string;
    name: string;
  } | null;
}

export default class CommunicationService {
  static http = http.create();

  static async getAll() {
    const response = await http.get(apiEndpoint);
    return response.data;
  }

  static async getById(id: number) {
    const response = await http.get(`${apiEndpoint}/${id}`);
    return response.data;
  }

  static async create(communication: Communication) {
    const response = await http.post(apiEndpoint, communication);
    return response.data;
  }

  static async update(id: number, updatedCommunication: string) {
    const response = await http.put(
      `${apiEndpoint}/${id}`,
      updatedCommunication,
    );
    return response.data;
  }

  static async delete(id: number) {
    const response = await http.delete(`${apiEndpoint}/${id}`);
    return response.data;
  }
}
