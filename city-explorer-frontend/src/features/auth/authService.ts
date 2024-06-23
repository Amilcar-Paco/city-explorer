

interface User {
  username: string;
  // Add more user details as needed
}

export const login = async (credentials: { username: string; password: string }): Promise<User> => {
  try {
    const response = await axiosInstance.post('/api/v1/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
};

export const refreshToken = async (): Promise<string> => {
  try {
    const response = await axiosInstance.post('/api/v1/auth/refresh-token');
    return response.data.accessToken;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to refresh token');
  }
};
