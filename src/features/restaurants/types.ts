import type { ImageSourcePropType } from 'react-native';
import type { EntityState } from '@reduxjs/toolkit';
import type { z } from 'zod';
import type { restaurantItemSchema } from '@/api/schemas';

export type RestaurantApiItem = z.infer<typeof restaurantItemSchema>;

export interface Restaurant extends RestaurantApiItem {
  isOpen: boolean;
  isClosed: boolean;
  cuisine: string;
}

export interface CuisineItem {
  name: string;
  title: string;
  image: ImageSourcePropType;
  placesCount: number;
}

export interface CuisinesData {
  cuisines: EntityState<CuisineItem, string>;
  restaurants: EntityState<Restaurant, string>;
  restaurantIdsByCuisine: Record<string, string[]>;
}
