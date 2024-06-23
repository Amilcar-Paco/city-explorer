import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  login as loginService,
  register as apiRegister,
  performLogout,
} from "./authService";

interface AuthState {
  firstName: string | null;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  firstName: null,
  loading: false,
  error: null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{
        firstName: string;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.loading = false;
      state.firstName = action.payload.firstName;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("firstName", action.payload.firstName);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (
      state,
      action: PayloadAction<{
        firstName: string;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.loading = false;
      state.firstName = action.payload.firstName;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("firstName", action.payload.firstName);
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.firstName = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("firstName");
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
} = authSlice.actions;

export const performLogin =
  (credentials: { email: string; password: string }) =>
  async (dispatch: any) => {
    dispatch(loginStart());
    try {
      const { firstName, accessToken, refreshToken } = await loginService(
        credentials
      );
      dispatch(loginSuccess({ firstName, accessToken, refreshToken }));
      return { firstName, accessToken, refreshToken };
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };

export const performRegister =
  (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) =>
  async (dispatch: any) => {
    dispatch(registerStart());
    try {
      const { firstName, accessToken, refreshToken } = await apiRegister(
        userData
      );
      dispatch(registerSuccess({ firstName, accessToken, refreshToken }));
    } catch (error: any) {
      dispatch(registerFailure(error.message));
    }
  };

export const performLogoutAction = () => async (dispatch: any) => {
  try {
    await performLogout();
    dispatch(logout());
  } catch (error: any) {
    console.error("Logout failed:", error);
  }
};

export default authSlice.reducer;
