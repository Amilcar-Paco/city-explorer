import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { refreshToken } from "./features/auth/authService";

// Extend AxiosRequestConfig to include _retry property
interface InternalAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;
    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshTokenItem = localStorage.getItem("refreshToken");
        if (!refreshTokenItem) {
          throw new Error("Refresh token not found");
        }
        const { accessToken, newRefreshToken } = await refreshToken(
          refreshTokenItem
        );
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Ensure originalRequest.headers is not undefined before setting Authorization header
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (error) {
       // store.dispatch(logout());
        //window.location.replace('/login');
        localStorage.remove("accessToken");
        localStorage.remove("refreshToken");
        localStorage.remove("firstName");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
