import http from "./httpService";
import config from "../config.json";

const apiUrl = config.apiUrl;
const apiEndpoint = apiUrl + "/locations";

class LocationService {
	http = http.create();

	async getAll() {
		const response = await http.get(apiEndpoint);
		return response.data;
	}

	async getAllByOrgId(orgId) {
		const response = await http.get(apiEndpoint, { params: { orgId } });
		return response.data;
	}

	async getById(id) {
		const response = await http.get(`${apiEndpoint}/${id}`);
		return response.data;
	}

	async create(location) {
		const response = await http.post(apiEndpoint, location);
		return response.data;
	}

	async update(id, updatedLocation) {
		const response = await http.put(`${apiEndpoint}/${id}`, updatedLocation);
		return response.data;
	}

	async delete(id) {
		const response = await http.delete(`${apiEndpoint}/${id}`);
		return response.data;
	}
}

const locationService = new LocationService();
export default locationService;
