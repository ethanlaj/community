import http from "./httpService";
import jwtDecode from "jwt-decode";

http.setJwt(getJwt());

export function getJwt() {
	return localStorage.getItem("token");
}

export function setJwt(jwt) {
	http.setJwt(jwt);
}

export function logout() {
	http.unsetJwt();
}

export function getCurrentUser() {
	try {
		const jwt = getJwt();
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}
}

// export async function loginWithJwt(jwt) {
// 	localStorage.setItem("token", jwt);
// }

const functions = {
	getJwt, setJwt, logout, getCurrentUser
};
export default functions;