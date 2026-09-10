import { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetCuisinesQuery } from '@/api';
import { useAppSelector } from '@/store';
import { selectRestaurantsByCuisine } from '../selectors';
import type { Restaurant } from '../types';
import type { RestaurantListNavigationProp, RestaurantListRouteProp } from '@/navigation';

export const useRestaurantList = () => {
  const navigation = useNavigation<RestaurantListNavigationProp>();
  const route = useRoute<RestaurantListRouteProp>();
  const { cuisine } = route.params;

  const { isLoading, isFetching, isError, refetch } = useGetCuisinesQuery();
  const restaurants = useAppSelector((state) => selectRestaurantsByCuisine(state, cuisine));

  const handleSelectRestaurant = useCallback(
    (item: Restaurant): void => {
      navigation.navigate('Detail', {
        restaurantId: item.id,
      });
    },
    [navigation]
  );

  return {
    cuisine,
    restaurants,
    isLoading,
    isFetching,
    isError,
    refetch,
    handleSelectRestaurant,
  };
};
