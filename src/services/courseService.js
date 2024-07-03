import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://jovem-trabalhador-api-main-2.onrender.com";

export function getAllCourses() {
  const response = axios.get(`${baseURL}/course/all`);
  return response;
}

export function registerCourses(data) {
  const response = axios.post(`${baseURL}/course/register`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response;
}

export function getCourse(data) {
  const response = axios.post(`${baseURL}/course/find`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response;
}

export function updateCourse(id, data) {
  const response = axios.put(`${baseURL}/course/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response;
}
