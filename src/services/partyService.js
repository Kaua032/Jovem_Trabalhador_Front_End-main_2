import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://api-jovemtrabalhador.onrender.com";

export function getAllPartys() {
  const response = axios.get(`${baseURL}/party/all`);
  return response;
}

export function registerPartys(data) {
  const response = axios.post(`${baseURL}/party/register`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response;
}

export function getParty(data) {
  const response = axios.post(`${baseURL}/party/find`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response;
}

export function updateParty(id, data) {
  const response = axios.put(`${baseURL}/party/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response;
}
