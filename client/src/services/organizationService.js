import http from "./httpService";
import config from "../config.js";

const apiUrl = config.apiUrl;
const apiEndpoint = apiUrl + "/organizations";

class OrganizationService {
	http = http.create();

	async getAll() {
		const response = await http.get(apiEndpoint);
		return response.data;
	}

	async getById(id) {
		const response = await http.get(`${apiEndpoint}/${id}`);
		return response.data;
	}

	async create(organization) {
		const response = await http.post(apiEndpoint, organization);
		return response.data;
	}

	async update(id, updatedOrganization) {
		const response = await http.put(`${apiEndpoint}/${id}`, updatedOrganization);
		return response.data;
	}

	async delete(id) {
		const response = await http.delete(`${apiEndpoint}/${id}`);
		return response.data;
	}
}

const organizationService = new OrganizationService();
export default organizationService;
