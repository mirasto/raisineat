import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/api';
import type { LoginResponse } from './types';

export interface AuthState {
  userId: number | null;
}

const initialState: AuthState = {
  userId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        state.userId = action.payload.userId;
      }
    );
  },
});

export const { logout } = authSlice.actions;

export const selectIsAuthorized = (state: { auth: AuthState }): boolean =>
  state.auth.userId !== null;

export const authReducer = authSlice.reducer;
