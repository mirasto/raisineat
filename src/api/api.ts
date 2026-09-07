import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { z } from 'zod';
import { API_CONFIG } from '@/constants/api';
import { CUISINE_IMAGES } from '@/assets/images';
import type {
  CuisineItem,
  CuisinesData,
  LoginCredentials,
  LoginResponse,
  Restaurant,
} from '@/types';

const restaurantItemSchema = z.object({
  id: z.string(),
  restaurantName: z.string(),
  shortDesc: z.string(),
  currency: z.string(),
  deliveryCost: z.number(),
  rating: z.number(),
  minOrder: z.number(),
  deliveryTime: z.string(),
  speciality: z.string().optional(),
  imageUrl: z.string(),
});

const cuisineGroupSchema = z.object({
  open: z.array(restaurantItemSchema),
  close: z.array(restaurantItemSchema),
});

const cuisinesApiResponseSchema = z.record(z.string(), cuisineGroupSchema);

const loginResponseSchema = z.object({
  message: z.string(),
  userId: z.number(),
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
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

export const {
  useLoginMutation,
  useGetCuisinesQuery,
  useLazyGetCuisinesQuery,
} = api;
