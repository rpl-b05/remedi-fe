import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.defaults.headers.common['Content-Type'] = 'application/json';

api.interceptors.request.use(config => {
  const userString = localStorage.getItem("user")
  if (userString) {
    const user = JSON.parse(userString)
    if (user.token) {
      config.headers.Authorization = `Bearer ${user?.token}`;
    }
  }
  return config;
});
