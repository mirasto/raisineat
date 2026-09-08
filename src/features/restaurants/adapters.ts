import { createEntityAdapter } from '@reduxjs/toolkit';
import type { ImageSourcePropType } from 'react-native';
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

export const adaptCuisinesApiResponse = (
  rawResponse: RawCuisinesApiResponse
): CuisinesData => {
  const cuisinesList: CuisineItem[] = [];
  const restaurantsList: Restaurant[] = [];
  const restaurantIdsByCuisine: Record<string, string[]> = {};

  for (const [name, { open, close }] of Object.entries(rawResponse)) {
    const cuisineRestaurants: Restaurant[] = [
      ...open.map((restaurant) => ({
        ...restaurant,
        isOpen: true,
        isClosed: false,
        cuisine: name,
      })),
      ...close.map((restaurant) => ({
        ...restaurant,
        isOpen: false,
        isClosed: true,
        cuisine: name,
      })),
    ];

    cuisinesList.push({
      name,
      title: name.charAt(0).toUpperCase() + name.slice(1),
      image: CUISINE_IMAGES[name.toLowerCase()] as ImageSourcePropType,
      placesCount: cuisineRestaurants.length,
    });

    restaurantIdsByCuisine[name.toLowerCase()] = cuisineRestaurants.map(
      (restaurant) => restaurant.id
    );
    restaurantsList.push(...cuisineRestaurants);
  }

  return {
    cuisines: cuisinesAdapter.setAll(
      cuisinesAdapter.getInitialState(),
      cuisinesList
    ),
    restaurants: restaurantsAdapter.setAll(
      restaurantsAdapter.getInitialState(),
      restaurantsList
    ),
    restaurantIdsByCuisine,
  };
};
