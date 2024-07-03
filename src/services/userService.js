import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://api-jovemtrabalhador.onrender.com";

export function signin(data) {
  const response = axios.post(`${baseURL}/user/login`, data);
  return response;
}

export function signup(data) {
  const response = axios.post(`${baseURL}/user/register`, data);
  return response;
}



export function findUser() {
  const response = axios.get(`${baseURL}/user/findById`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
