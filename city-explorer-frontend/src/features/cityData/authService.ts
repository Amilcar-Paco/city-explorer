import {
  getWeather as weatherAPI,
  getExchangeRate as exchangeRateAPI,
} from "./cityAPI";

export const getWeather = async (cityName: string): Promise<any> => {
  try {
    const response = await weatherAPI(cityName);
    return response.data;
  } catch (error) {
    console.log("City not found:  ", error);
  }
};

export const getExchangeRate = async (): Promise<any> => {
  try {
    const response = await exchangeRateAPI();
    return response.data;
  } catch (error) {
    console.log("Failed to load exchange rates.");
  }
};
