import type { ImageSourcePropType } from 'react-native';

export interface RestaurantApiItem {
  id: string;
  restaurantName: string;
  shortDesc: string;
  currency: string;
  deliveryCost: number;
  rating: number;
  minOrder: number;
  deliveryTime: string;
  speciality?: string;
  imageUrl: string;
}

export interface CuisineGroupApiItem {
  open: RestaurantApiItem[];
  close: RestaurantApiItem[];
}

export type CuisinesApiResponse = Record<string, CuisineGroupApiItem>;

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
