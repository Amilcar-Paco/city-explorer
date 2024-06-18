import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCityData } from './cityDataService'; //TODO

interface CityDataState {
  weather: any | null;
  population: any | null;
  gdp: any | null;
  exchangeRate: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: CityDataState = {
  weather: null,
  population: null,
  gdp: null,
  exchangeRate: null,
  loading: false,
  error: null,
};

const cityDataSlice = createSlice({
  name: 'cityData',
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
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = cityDataSlice.actions;

export const fetchCityDataThunk = (city: string) => async (dispatch: any) => {
  dispatch(fetchDataStart());
  try {
    const data = await fetchCityData(city);
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

export default cityDataSlice.reducer;
