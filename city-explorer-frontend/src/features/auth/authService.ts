import axiosInstance from '../../axiosInterceptor';
import { login as loginAPI } from './authAPI';

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const login = async (credentials: { email: string; password: string }): Promise<any> => {
  try {
    const response = await loginAPI(credentials);
    return response;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const register = async (userData: RegisterRequest): Promise<any> => {
  try {
    const response = await axiosInstance.post('/api/v1/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const performLogout = async (): Promise<void> => {
  // Optionally clear local storage or perform other cleanup actions
};

export const refreshToken = async (refreshToken: string): Promise<{ accessToken: string; newRefreshToken: string }> => {
  try {
    const response = await axiosInstance.post('/api/v1/auth/refresh-token', { refreshToken });
    return response.data;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};


