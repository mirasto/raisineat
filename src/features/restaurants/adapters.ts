import { createEntityAdapter } from '@reduxjs/toolkit';
import { CUISINE_IMAGES } from '@/assets/images';
import type { z } from 'zod';
import type { cuisinesApiResponseSchema } from '@/api/schemas';
import type { CuisineItem, CuisinesData, Restaurant } from './types';

export type RawCuisinesApiResponse = z.infer<typeof cuisinesApiResponseSchema>;

export const restaurantsAdapter = createEntityAdapter<Restaurant, string>({
  selectId: (restaurant) => restaurant.id,
});

export const cuisinesAdapter = createEntityAdapter<CuisineItem, string>({
  selectId: (cuisine) => cuisine.name,
});

export const adaptCuisinesApiResponse = (rawResponse: RawCuisinesApiResponse): CuisinesData => {
  const cuisinesList: CuisineItem[] = [];
  const restaurantsList: Restaurant[] = [];
  const restaurantIdsByCuisine: Record<string, string[]> = {};

  for (const [name, { open, close }] of Object.entries(rawResponse)) {
    const cuisineKey = name.toLowerCase();
    if (!(cuisineKey in CUISINE_IMAGES)) {
      continue;
    }

    const cuisineRestaurants: Restaurant[] = [
      ...open.map((restaurant) => ({
        ...restaurant,
        isAvailable: true,
      })),
      ...close.map((restaurant) => ({
        ...restaurant,
        isAvailable: false,
      })),
    ];

    cuisinesList.push({
      name,
      image: CUISINE_IMAGES[cuisineKey as keyof typeof CUISINE_IMAGES],
      placesCount: cuisineRestaurants.length,
    });

    restaurantIdsByCuisine[cuisineKey] = cuisineRestaurants.map((restaurant) => restaurant.id);
    restaurantsList.push(...cuisineRestaurants);
  }

  return {
    cuisines: cuisinesAdapter.setAll(cuisinesAdapter.getInitialState(), cuisinesList),
    restaurants: restaurantsAdapter.setAll(restaurantsAdapter.getInitialState(), restaurantsList),
    restaurantIdsByCuisine,
  };
};
