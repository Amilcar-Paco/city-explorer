import { AxiosError } from "axios";
import axiosInstance from "../../axiosInterceptor";

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface Credentials {
  email: string;
  password: string;
}

export const login = async (credentials: Credentials): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/auth/login",
      credentials
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    console.log('Erro::: ',error)
    throw new Error("Login failed");
  }
};

export const register = async (userData: RegisterRequest): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/auth/register",
      userData
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Registration failed");
  }
};

export const refreshToken = async (
  refreshToken: string
): Promise<{ accessToken: string; newRefreshToken: string }> => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/refresh-token", {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Failed to refresh token");
  }
};

const handleAxiosError = (error: any): void => {
  if (isAxiosError(error)) {
    if (error.response) {
      throw new Error(error.response.data.message || "Request failed");
    } else if (error.request) {
      console.error("Request made but no response received:", error.request);
      throw new Error("Request failed");
    } else {
      console.error("Error setting up request:", error.message);
      throw new Error("Request failed");
    }
  } else {
    console.error("Unknown error:", error);
    throw new Error("Unknown error occurred");
  }
};

const isAxiosError = (error: any): error is AxiosError<any> => {
  return (error as AxiosError<any>).isAxiosError !== undefined;
};
