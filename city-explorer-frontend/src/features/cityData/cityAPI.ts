import axiosInstance from "../../axiosInterceptor";

export const getWeather = async (cityName: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/api/v1/city/weather/${cityName}`);
    return response;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw new Error("Failed to fetch weather data");
  }
};

export const getExchangeRate = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/api/v1/city/exchange-rates`);
    return response;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw new Error("Failed to fetch exchange rates data");
  }
};
