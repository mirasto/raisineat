import type { ImageSourcePropType } from 'react-native';
import { CUISINE_IMAGES } from '@/assets/images';
import type { z } from 'zod';
import type { cuisinesApiResponseSchema } from '@/api/schemas';
import type { CuisineItem, CuisinesData, Restaurant } from './types';

export type RawCuisinesApiResponse = z.infer<typeof cuisinesApiResponseSchema>;

export const adaptCuisinesApiResponse = (
  rawResponse: RawCuisinesApiResponse
): CuisinesData => {
  const cuisines: CuisineItem[] = [];
  const restaurantsByCuisine: Record<string, Restaurant[]> = {};
  const restaurantsById: Record<string, Restaurant> = {};

  for (const [name, { open, close }] of Object.entries(rawResponse)) {
    const allRestaurants: Restaurant[] = [
      ...open.map((restaurant) => ({ ...restaurant, isOpen: true, isClosed: false, cuisine: name })),
      ...close.map((restaurant) => ({ ...restaurant, isOpen: false, isClosed: true, cuisine: name })),
    ];

    cuisines.push({
      name,
      title: name.charAt(0).toUpperCase() + name.slice(1),
      image: CUISINE_IMAGES[name.toLowerCase()] as ImageSourcePropType,
      placesCount: allRestaurants.length,
    });

    restaurantsByCuisine[name.toLowerCase()] = allRestaurants;

    for (const restaurant of allRestaurants) {
      restaurantsById[restaurant.id] = restaurant;
    }
  }

  return {
    cuisines,
    restaurantsByCuisine,
    restaurantsById,
  };
};
