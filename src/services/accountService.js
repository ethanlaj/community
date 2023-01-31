import http from "./httpService";
import config from "../config.json";
const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "/account";

class AccountService {
	http = http.create({
		baseURL: "http://localhost/Projects/community-api/account",
	});

	async login(email, password) {
		const { data } = await http.post(`${apiEndpoint}/login.php`, { email, password });

		if (data.token)
			http.setJwt(data.token);
	}

	async updateLogin(currentPassword, newPassword) {
		const { data } = await http.put(`${apiEndpoint}/login.php`, { currentPassword, newPassword });

		if (data.token)
			http.setJwt(data.token);
	}

	async getUsers() {
		const response = await http.get(`${apiEndpoint}/users.php`);
		return response.data;
	}

	async createUser(email, password, firstName, lastName, permissionLevel) {
		const response = await http.post(`${apiEndpoint}/users.php`,
			{
				email,
				password,
				firstName,
				lastName,
				permissionLevel
			});
		return response.data;
	}

	async updateUser(userID, email, firstName, lastName, permissionLevel) {
		const response = await http.put(`${apiEndpoint}/users.php`,
			{
				userID,
				email,
				firstName,
				lastName,
				permissionLevel
			});
		return response.data;
	}

	async deleteUser(userID) {
		const response = await http.delete(`${apiEndpoint}/users.php`, {
			data: { userID },
		});
		return response.data;
	}
}

const accountService = new AccountService();
export default accountService;
