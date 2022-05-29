import axios from "axios";
import { BASE_URL } from "../api/login";
import { brukerData } from "../serv/worker";

const url = BASE_URL;

export default function useAxios() {
  const apiClient = axios.create({
    baseURL: url,
  });

  const user = brukerData.userValue;

  apiClient.interceptors.request.use(function (config) {
    const token = user.token;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return apiClient;
}
