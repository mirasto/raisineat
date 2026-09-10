import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetCuisinesQuery } from '@/api';
import { useAppSelector } from '@/store';
import { selectRestaurantById } from '../selectors';
import type { RestaurantDetailNavigationProp, RestaurantDetailRouteProp } from '@/navigation';

export const useRestaurantDetail = () => {
  const navigation = useNavigation<RestaurantDetailNavigationProp>();
  const route = useRoute<RestaurantDetailRouteProp>();
  const { restaurantId } = route.params;

  const { isLoading, isError, refetch } = useGetCuisinesQuery();
  const restaurant = useAppSelector((state) => selectRestaurantById(state, restaurantId));

  const handleBack = (): void => {
    navigation.goBack();
  };

  return {
    restaurant,
    isLoading: isLoading && !restaurant,
    isError: isError && !restaurant,
    refetch,
    handleBack,
  };
};
