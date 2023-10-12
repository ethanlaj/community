import http from "./httpService";
import config from "../config.js";

const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/locations`;

export default class LocationService {
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

  static async create(location: string) {
    const response = await http.post(apiEndpoint, location);
    return response.data;
  }

  static async update(id: number, updatedLocation: string) {
    const response = await http.put(`${apiEndpoint}/${id}`, updatedLocation);
    return response.data;
  }

  static async delete(id: number) {
    const response = await http.delete(`${apiEndpoint}/${id}`);
    return response.data;
  }
}
