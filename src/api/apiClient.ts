import axios from "axios";
import Cookies from 'js-cookie'
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials:true,
});

apiClient.interceptors.request.use((config) => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
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
            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {
                const { data } = await apiClient.post("/auth/refreshToken", undefined, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    }
                });

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

                return apiClient(originalRequest);
            } catch {
                Cookies.remove("refresh_token")
                Cookies.remove("access_token")
            }
        }

        return Promise.reject(error);
    }

); export default apiClient;