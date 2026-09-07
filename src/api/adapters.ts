import { CUISINE_IMAGES, italianImage } from '@/assets/images';
import type { CuisineItem, CuisinesData, Restaurant } from '@/types';
import type { z } from 'zod';
import type { cuisinesApiResponseSchema } from './schemas';

export type RawCuisinesApiResponse = z.infer<typeof cuisinesApiResponseSchema>;

/**
 * Transforms raw cuisines API response into normalized UI data structures.
 * Groups restaurants into indexed lookups (byCuisine, byId) to eliminate repetitive traversals.
 */
export const adaptCuisinesApiResponse = (
  rawResponse: RawCuisinesApiResponse
): CuisinesData => {
  const cuisines: CuisineItem[] = [];
  const restaurantsByCuisine: Record<string, Restaurant[]> = {};
  const restaurantsById: Record<string, Restaurant> = {};

  for (const [cuisineName, group] of Object.entries(rawResponse)) {
    const openRestaurants: Restaurant[] = (group.open ?? []).map(
      (rawRestaurant) => ({
        ...rawRestaurant,
        isOpen: true,
        isClosed: false,
        cuisine: cuisineName,
      })
    );

    const closedRestaurants: Restaurant[] = (group.close ?? []).map(
      (rawRestaurant) => ({
        ...rawRestaurant,
        isOpen: false,
        isClosed: true,
        cuisine: cuisineName,
      })
    );

    const allRestaurants: Restaurant[] = [
      ...openRestaurants,
      ...closedRestaurants,
    ];

    cuisines.push({
      name: cuisineName,
      title: cuisineName.charAt(0).toUpperCase() + cuisineName.slice(1),
      image: CUISINE_IMAGES[cuisineName.toLowerCase()] ?? italianImage,
      placesCount: allRestaurants.length,
    });

    restaurantsByCuisine[cuisineName.toLowerCase()] = allRestaurants;

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
