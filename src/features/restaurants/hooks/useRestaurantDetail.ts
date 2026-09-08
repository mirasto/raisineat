import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetCuisinesQuery } from '@/api';
import { useAppSelector } from '@/store';
import { selectRestaurantById } from '../selectors';
import { formatRatingFeedback } from '@/shared/utils';
import type { RestaurantDetailNavigationProp, RestaurantDetailRouteProp } from '@/navigation';

export const useRestaurantDetail = () => {
  const navigation = useNavigation<RestaurantDetailNavigationProp>();
  const route = useRoute<RestaurantDetailRouteProp>();
  const { restaurantId } = route.params;

  const { isLoading } = useGetCuisinesQuery();
  const restaurant = useAppSelector((state) =>
    selectRestaurantById(state, restaurantId)
  );

  const handleBack = (): void => {
    navigation.goBack();
  };

  const ratingFeedback = restaurant ? formatRatingFeedback(restaurant.rating) : '';

  return {
    restaurant,
    isLoading: isLoading && !restaurant,
    ratingFeedback,
    handleBack,
  };
};
