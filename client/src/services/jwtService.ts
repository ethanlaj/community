import jwtDecode from "jwt-decode";
import http from "./httpService";

http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem("token");
}

export function setJwt(jwt: any) {
  http.setJwt(jwt);
}

export function logout() {
  http.unsetJwt();
}

export function getCurrentUser() {
  try {
    const jwt = getJwt();
    return jwtDecode(jwt as string);
  } catch (ex) {
    return null;
  }
}

// export async function loginWithJwt(jwt) {
//   localStorage.setItem("token", jwt);
// }

const functions = {
  getJwt,
  setJwt,
  logout,
  getCurrentUser,
};
export default functions;
