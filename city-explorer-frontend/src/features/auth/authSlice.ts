import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from './authService'; // TODO

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const user = await loginUser(credentials);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const performLogout = () => async (dispatch) => {
  await logoutUser();
  dispatch(logout());
};

export default authSlice.reducer;
