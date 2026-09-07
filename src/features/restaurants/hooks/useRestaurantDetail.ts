import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetCuisinesQuery } from '@/api';
import { useAppSelector } from '@/store';
import { selectRestaurantById } from '../selectors';
import type { RestaurantDetailNavigationProp, RestaurantDetailRouteProp } from '@/navigation';

const RATING_THRESHOLD = {
  VERY_GOOD: 8.5,
  GOOD: 7.5,
} as const;

const getRatingFeedback = (rating: number): string => {
  if (rating >= RATING_THRESHOLD.VERY_GOOD) {
    return 'Very good';
  }
  if (rating >= RATING_THRESHOLD.GOOD) {
    return 'Good';
  }
  return 'Satisfactory';
};

export const useRestaurantDetail = () => {
  const navigation = useNavigation<RestaurantDetailNavigationProp>();
  const route = useRoute<RestaurantDetailRouteProp>();
  const { restaurantId } = route.params;

  const { isLoading } = useGetCuisinesQuery();
  const restaurant = useAppSelector(selectRestaurantById(restaurantId));

  const handleBack = (): void => {
    navigation.goBack();
  };

  const ratingFeedback = restaurant ? getRatingFeedback(restaurant.rating) : '';

  return {
    restaurant,
    isLoading: isLoading && !restaurant,
    ratingFeedback,
    handleBack,
  };
};
