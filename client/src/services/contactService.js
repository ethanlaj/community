import http from "./httpService";
import config from "../config.js";

const apiUrl = config.apiUrl;
const apiEndpoint = apiUrl + "/contacts";

class ContactService {
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

	async create(contact, organizations) {
		const response = await http.post(apiEndpoint, {
			contact: contact,
			organizations: organizations,
		});
		return response.data;
	}

	async update(id, updatedContact) {
		const response = await http.put(`${apiEndpoint}/${id}`, updatedContact);
		return response.data;
	}

	async delete(id) {
		const response = await http.delete(`${apiEndpoint}/${id}`);
		return response.data;
	}
}

const contactService = new ContactService();
export default contactService;
