import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
};

export type RestaurantsStackParamList = {
  Cuisines: undefined;
  Restaurants: { cuisine: string; title?: string };
  Detail: { restaurantId: string; title?: string };
};



export type SplashScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export type CuisineListNavigationProp = NativeStackNavigationProp<
  RestaurantsStackParamList,
  'Cuisines'
>;

export type RestaurantListNavigationProp = NativeStackNavigationProp<
  RestaurantsStackParamList,
  'Restaurants'
>;

export type RestaurantListRouteProp = RouteProp<RestaurantsStackParamList, 'Restaurants'>;

export type RestaurantDetailNavigationProp = NativeStackNavigationProp<
  RestaurantsStackParamList,
  'Detail'
>;

export type RestaurantDetailRouteProp = RouteProp<RestaurantsStackParamList, 'Detail'>;
