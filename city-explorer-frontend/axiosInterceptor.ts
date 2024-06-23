import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
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
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
       // const accessToken = await refreshToken();
      //  localStorage.setItem('accessToken', accessToken);
        return axiosInstance(originalRequest);
      } catch (error) {
        // Handle refresh token failure (e.g., redirect to login)
       // dispatch(logout());
        window.location.replace('/login'); // Example redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
