import type { ImageSourcePropType } from 'react-native';
import type { EntityState } from '@reduxjs/toolkit';
import type { z } from 'zod';
import type { restaurantItemSchema } from '@/api/schemas';

export type RestaurantApiItem = z.infer<typeof restaurantItemSchema>;

export interface Restaurant extends RestaurantApiItem {
  isAvailable: boolean;
}

export interface CuisineItem {
  name: string;
  image: ImageSourcePropType;
  placesCount: number;
}

export interface CuisinesData {
  cuisines: EntityState<CuisineItem, string>;
  restaurants: EntityState<Restaurant, string>;
  restaurantIdsByCuisine: Record<string, string[]>;
}
