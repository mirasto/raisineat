import { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetCuisinesQuery } from '@/api';
import { selectRestaurantsByCuisine, useAppSelector } from '@/store';
import type { Restaurant } from '@/types';
import type { RestaurantListNavigationProp, RestaurantListRouteProp } from '@/navigation';

export const useRestaurantList = () => {
  const navigation = useNavigation<RestaurantListNavigationProp>();
  const route = useRoute<RestaurantListRouteProp>();
  const cuisine = route.params?.cuisine ?? '';

  const { isLoading, isFetching, isError, refetch } = useGetCuisinesQuery();
  const restaurants = useAppSelector(selectRestaurantsByCuisine(cuisine));

  const handleSelectRestaurant = useCallback(
    (item: Restaurant) => {
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
    isLoading: isLoading && restaurants.length === 0,
    isRefreshing: isFetching && !isLoading,
    isError: isError && restaurants.length === 0,
    refetch,
    handleSelectRestaurant,
  };
};
