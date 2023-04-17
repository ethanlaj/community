import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response && error.response.status >= 400 && error.response.status < 500;

	if (!expectedError) {
		toast.error("An unexpected error occurrred.");
	}

	return Promise.reject(error);
});

// function setJwt(jwt) {
// 	axios.defaults.headers.common["x-auth-token"] = jwt;
// 	localStorage.setItem("token", jwt);
// }

// function unsetJwt() {
// 	axios.defaults.headers.common["x-auth-token"] = null;
// 	localStorage.removeItem("token");
// }

const functions = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	create: axios.create,
};
export default functions;
