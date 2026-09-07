import { z } from 'zod';
import { API_CONFIG } from '@/constants/api';
import type { CuisinesApiResponse } from '../types';

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

export const fetchCuisines = async (): Promise<CuisinesApiResponse> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUISINES}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch cuisines: ${response.status} ${response.statusText}`);
  }

  const rawData: unknown = await response.json();
  const parseResult = cuisinesApiResponseSchema.safeParse(rawData);

  if (!parseResult.success) {
    throw new Error('Invalid cuisines data format received from API');
  }

  return parseResult.data;
};
