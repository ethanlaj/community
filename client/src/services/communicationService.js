import http from "./httpService";
import config from "../config.js";

const apiUrl = config.apiUrl;
const apiEndpoint = apiUrl + "/communications";

class CommunicationService {
	http = http.create();

	async getAll() {
		const response = await http.get(apiEndpoint);
		return response.data;
	}

	async getById(id) {
		const response = await http.get(`${apiEndpoint}/${id}`);
		return response.data;
	}

	async create(communication) {
		const response = await http.post(apiEndpoint, communication);
		return response.data;
	}

	async update(id, updatedCommunication) {
		const response = await http.put(`${apiEndpoint}/${id}`, updatedCommunication);
		return response.data;
	}

	async delete(id) {
		const response = await http.delete(`${apiEndpoint}/${id}`);
		return response.data;
	}
}

const communicationService = new CommunicationService();
export default communicationService;
