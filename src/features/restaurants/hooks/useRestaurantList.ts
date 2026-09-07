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
  const cuisine = route.params?.cuisine ?? '';

  const { isLoading, isFetching, isError, refetch } = useGetCuisinesQuery();
  const restaurants = useAppSelector(selectRestaurantsByCuisine(cuisine));

  const handleSelectRestaurant = useCallback(
    (item: Restaurant): void => {
      navigation.navigate('Detail', {
        restaurantId: item.id,
        title: item.restaurantName,
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
