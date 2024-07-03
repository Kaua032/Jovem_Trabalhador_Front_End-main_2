import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://api-jovemtrabalhador.onrender.com";

export function getAllStudentsByPage(data) {
  const response = axios.post(`${baseURL}/student/all`, data);

  return response;
}

export function getAllStudentsBySearch(data) {
  const response = axios.post(`${baseURL}/student/search`, data);

  return response;
}

export function postAllStudents(data) {
  const response = axios.post(`${baseURL}/student/register`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response;
}

export function delStudent(data) {
  const response = axios.delete(`${baseURL}/student/delete/${data}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response;
}

export function generateStudents(data) {
  const response = axios.post(`${baseURL}/student/generate`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response;
}

export function exportStudentCSV(data) {
  const response = axios.post(`${baseURL}/student/export`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    responseType: "blob",
  });

  return response;
}

export function updateStudent(data) {
  const response = axios.put(`${baseURL}/student/update`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response;
}
