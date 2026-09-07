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
  cuisine: string;
}

export interface CuisineInfo {
  id: string;
  name: string;
  title: string;
  openCount: number;
  totalCount: number;
}
