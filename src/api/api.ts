import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/shared/constants';
import { adaptCuisinesApiResponse } from '@/features/restaurants/adapters';
import { cuisinesApiResponseSchema, loginResponseSchema } from './schemas';
import type { CuisinesData } from '@/features/restaurants/types';
import type { LoginCredentials, LoginResponse } from '@/features/auth/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT_MS,
  }),
  tagTypes: ['Cuisines'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: API_CONFIG.ENDPOINTS.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: unknown): LoginResponse => {
        return loginResponseSchema.parse(response);
      },
    }),
    getCuisines: builder.query<CuisinesData, void>({
      query: () => API_CONFIG.ENDPOINTS.CUISINES,
      providesTags: ['Cuisines'],
      transformResponse: (response: unknown): CuisinesData => {
        const rawData = cuisinesApiResponseSchema.parse(response);
        return adaptCuisinesApiResponse(rawData);
      },
    }),
  }),
});

export const { useLoginMutation, useGetCuisinesQuery } = api;
