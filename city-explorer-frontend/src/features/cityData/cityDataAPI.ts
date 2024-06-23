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

export const getPopulation = async (cityName: string): Promise<any> => {
  try {
    const population = await axiosInstance.get(`/api/v1/city/${cityName}/population`);
    return  population.data[1];
  } catch (error) {
    console.error("Error fetching population", error);
    throw new Error("Failed to fetch population data");
  }
};


export const getGDP = async (cityName: string): Promise<any> => {
  try {
    const gdp = await axiosInstance.get(`/api/v1/city/${cityName}/gdp`);
    return  gdp.data[1];
  } catch (error) {
    console.error("Error fetching population", error);
    throw new Error("Failed to fetch GDP data");
  }
};