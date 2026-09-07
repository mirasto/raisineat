import type { ImageSourcePropType } from 'react-native';
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
  cuisines: CuisineItem[];
  restaurantsByCuisine: Record<string, Restaurant[]>;
  restaurantsById: Record<string, Restaurant>;
}
