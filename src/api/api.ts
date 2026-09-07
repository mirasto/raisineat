import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/constants/api';
import { CUISINE_IMAGES } from '@/assets/images';
import { cuisinesApiResponseSchema, loginResponseSchema } from './schemas';
import type {
  CuisineItem,
  CuisinesData,
  LoginCredentials,
  LoginResponse,
  Restaurant,
} from '@/types';

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
        const cuisines: CuisineItem[] = [];
        const restaurantsByCuisine: Record<string, Restaurant[]> = {};
        const restaurantsById: Record<string, Restaurant> = {};

        for (const [name, group] of Object.entries(rawData)) {
          const open = (group.open ?? []).map((r) => ({
            ...r,
            isOpen: true,
            isClosed: false,
            cuisine: name,
          }));
          const close = (group.close ?? []).map((r) => ({
            ...r,
            isOpen: false,
            isClosed: true,
            cuisine: name,
          }));
          const all = [...open, ...close];

          cuisines.push({
            name,
            title: name.charAt(0).toUpperCase() + name.slice(1),
            image: CUISINE_IMAGES[name.toLowerCase()],
            placesCount: all.length,
          });

          restaurantsByCuisine[name.toLowerCase()] = all;
          for (const r of all) {
            restaurantsById[r.id] = r;
          }
        }

        return { cuisines, restaurantsByCuisine, restaurantsById };
      },
    }),
  }),
});

export const { useLoginMutation, useGetCuisinesQuery } = api;
