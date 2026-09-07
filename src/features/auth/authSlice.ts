import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/api';
import type { LoginResponse } from './types';

export interface AuthState {
  isAuthorized: boolean;
  userId: number | null;
}

const initialState: AuthState = {
  isAuthorized: false,
  userId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.isAuthorized = true;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.isAuthorized = false;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        state.isAuthorized = true;
        state.userId = action.payload.userId;
      }
    );
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const selectIsAuthorized = (state: { auth: AuthState }): boolean =>
  state.auth.isAuthorized;
export const selectCurrentUserId = (state: { auth: AuthState }): number | null =>
  state.auth.userId;

export const authReducer = authSlice.reducer;
