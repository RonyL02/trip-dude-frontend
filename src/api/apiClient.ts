import axios from "axios";
import Cookies from 'js-cookie'
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    if (config.url?.includes("logout") && (refreshToken)) {
        Cookies.remove("access_token")
        Cookies.remove("refresh_token")
        config.headers.Authorization = `Bearer ${refreshToken}`;
    }
    else if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }


    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = Cookies.get("refresh_token");

            try {
                await apiClient.post("/auth/refreshToken", undefined, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    }
                });

                return apiClient(originalRequest);
            } catch {
                Cookies.remove("refresh_token")
                Cookies.remove("access_token")

                window.location.href = '/login'
            }
        }

        return Promise.reject(error);
    }

); export default apiClient;