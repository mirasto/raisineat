import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetCuisinesQuery } from '@/api';
import { selectRestaurantById, useAppSelector } from '@/store';
import type { RestaurantDetailNavigationProp, RestaurantDetailRouteProp } from '@/navigation';

const getRatingFeedback = (rating: number): string => {
  if (rating >= 8.5) {
    return 'Very good';
  }
  if (rating >= 7.5) {
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

  const handleBack = () => {
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
