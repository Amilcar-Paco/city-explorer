import {
  getWeather as weatherAPI,
  getExchangeRate as exchangeRateAPI,
  getPopulation as getPopulationAPI,
  getGDP as getGDPAPI,
} from "./cityDataAPI";

interface PopulationGdpData {
  city: string;
  population: number | null;
  gdp: number | null;
  date: string;
}

export const getWeather = async (cityName: string): Promise<any> => {
  const response = await weatherAPI(cityName);
  return response.data;
};

export const getExchangeRate = async (): Promise<any> => {
  const response = await exchangeRateAPI();
  return response.data;
};

export const getPopulationGDP = async (cityName: string): Promise<PopulationGdpData[]> => {
  const populationData = await getPopulationAPI(cityName);
  const gdpData = await getGDPAPI(cityName);

  const combinedData: PopulationGdpData[] = [];

  populationData.forEach((popData: any) => {
    const matchingGdp = gdpData.find((gdp: any) => gdp.date === popData.date);
    const gdpValue = matchingGdp ? matchingGdp.value : null;

    combinedData.push({
      city: popData.country.value,
      population: popData.value,
      gdp: gdpValue,
      date: popData.date,
    });
  });

  return combinedData;
};
