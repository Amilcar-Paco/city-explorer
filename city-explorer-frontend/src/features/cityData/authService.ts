import { getWeather as weatherAPI } from "./cityAPI";

export const getWeather = async (cityName: string): Promise<any> => {
  try {
    const response = await weatherAPI(cityName);
    return response.data;
  } catch (error) {
    console.log("Cidade  nao encontrda");
  }
};
