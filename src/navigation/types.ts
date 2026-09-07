import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
};

export type DashboardStackParamList = {
  Cuisines: undefined;
  Restaurants: { cuisine: string };
  Detail: { restaurantId: string; title?: string };
};

export type RootStackParamList = {
  Auth: undefined;
  Dashboard: undefined;
};

export type SplashScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export type CuisineListNavigationProp = NativeStackNavigationProp<
  DashboardStackParamList,
  'Cuisines'
>;

export type RestaurantListNavigationProp = NativeStackNavigationProp<
  DashboardStackParamList,
  'Restaurants'
>;

export type RestaurantListRouteProp = RouteProp<DashboardStackParamList, 'Restaurants'>;

export type RestaurantDetailNavigationProp = NativeStackNavigationProp<
  DashboardStackParamList,
  'Detail'
>;

export type RestaurantDetailRouteProp = RouteProp<DashboardStackParamList, 'Detail'>;
