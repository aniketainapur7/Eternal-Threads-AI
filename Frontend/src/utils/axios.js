import axios from "axios";
import { Clerk } from "@clerk/clerk-js"; // or useAuth hook if in React context

const axiosInstance = axios.create({
  baseURL: "https://lh6zvgwv-3000.inc1.devtunnels.ms/api",
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await window.Clerk.session?.getToken(); // 👈 Clerk JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance };