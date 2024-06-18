import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cityDataReducer from '../features/cityData/cityDataSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cityData: cityDataReducer,
});

export default rootReducer;
