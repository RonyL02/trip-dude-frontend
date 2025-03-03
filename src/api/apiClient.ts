import axios from "axios";
// import Cookies from 'js-cookie'
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

// apiClient.interceptors.request.use((config) => {
//     const token = Cookies.get("auth_token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     // config.auth
//     return config;
// })

export default apiClient;