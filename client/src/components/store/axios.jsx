import axios from "axios";

const token = localStorage.getItem("token");

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { Authorization: `Bearer ${token ? JSON.parse(token) : null}` },
});

export default API;
