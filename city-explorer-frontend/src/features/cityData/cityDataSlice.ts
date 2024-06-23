import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getWeather } from "./authService";

interface CityDataState {
  weather: any | null;
  population: any | null;
  gdp: any | null;
  exchangeRate: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: CityDataState = {
  weather: {
    lat: null,
    lon: null,
    timezone: null,
    timezone_offset: null,
    dt: null,
    sunrise: null,
    temp: null,
    feels_like: null,
    pressure: null,
    humidity: null,
    dew_point: null,
    uvi: null,
    clouds: null,
    visibility: null,
    wind_speed: null,
    wind_deg: null,
    main: null,
    description: null,
    icon: null,
    country: null,
    state: null,
  },
  population: null,
  gdp: null,
  exchangeRate: null,
  loading: false,
  error: null,
};

const cityDataSlice = createSlice({
  name: "cityData",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      const { weather, population, gdp, exchangeRate } = action.payload;
      state.weather = weather;
      state.population = population;
      state.gdp = gdp;
      state.exchangeRate = exchangeRate;
    },
    fetchWeatherSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.weather.lat = action.payload.geoLocation.lat;
      state.weather.lon = action.payload.geoLocation.lon;
      state.weather.country = action.payload.geoLocation.country;
      state.weather.state = action.payload.geoLocation.state;
      state.weather.timezone = action.payload.timezone;
      state.weather.timezone_offset = action.payload.timezone_offset;
      state.weather.dt = action.payload.current.dt;
      state.weather.sunrise = action.payload.current.sunrise;
      state.weather.temp = Math.floor(action.payload.current.temp);
      state.weather.feels_like = Math.floor(action.payload.current.feels_like);
      state.weather.pressure = action.payload.current.pressure;
      state.weather.humidity = action.payload.current.humidity;
      state.weather.dew_point = action.payload.current.dew_point;
      state.weather.uvi = action.payload.current.uvi;
      state.weather.clouds = action.payload.current.clouds;
      state.weather.visibility = action.payload.current.visibility / 100;
      state.weather.wind_speed = action.payload.current.wind_speed;
      state.weather.wind_deg = action.payload.current.wind_deg;
      state.weather.main = action.payload.current.weather[0].main;
      state.weather.description = action.payload.current.weather[0].description;
      state.weather.icon = action.payload.current.weather[0].icon;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  fetchWeatherSuccess,
} = cityDataSlice.actions;

export const fetchWeatherData = (cityName: string) => async (dispatch: any) => {
  dispatch(fetchDataStart());
  try {
    const response = await getWeather(cityName);
    dispatch(fetchWeatherSuccess(response));
  } catch (error: any) {
    dispatch(fetchDataFailure("Cidade nao encontrada"));
  }
};

export default cityDataSlice.reducer;
