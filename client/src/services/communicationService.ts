import http from './httpService';
import { apiUrl } from '../config';
import { Communication } from '@/types/communication';

const apiEndpoint = `${apiUrl}/communications`;

interface CreateUpdateCommunicationDTO {
  date: string;
  type: string;
  contactIds: number[];
  userIds: number[];
  note: string;
  locationId: number | undefined;
  organizationIds: number[];
}

export default class CommunicationService {
  static http = http.create();

  static async getAll() {
    const response = await http.get(apiEndpoint);
    return response.data;
  }

  static async getById(id: number): Promise<Communication> {
    const response = await http.get(`${apiEndpoint}/${id}`);
    return response.data;
  }

  static async create(communication: CreateUpdateCommunicationDTO): Promise<Communication> {
    const response = await http.post(apiEndpoint, communication);
    return response.data;
  }

  static async update(id: number, updatedCommunication: CreateUpdateCommunicationDTO) {
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
