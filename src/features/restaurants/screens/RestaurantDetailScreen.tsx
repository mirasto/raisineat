import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ErrorState, Loader } from '@/shared/ui';
import { theme } from '@/shared/constants';
import { RestaurantHero } from '../components/RestaurantHero';
import { RestaurantMeta } from '../components/RestaurantMeta';
import { useRestaurantDetail } from '../hooks/useRestaurantDetail';

const PADDING_BOTTOM_OFFSET = 24;

export const RestaurantDetailScreen = () => {
  const insets = useSafeAreaInsets();
  const { restaurant, isLoading, ratingFeedback, handleBack } = useRestaurantDetail();

  if (isLoading) {
    return <Loader />;
  }

  if (!restaurant) {
    return (
      <ErrorState
        message="Restaurant not found"
        onRetry={handleBack}
        retryTitle="Go Back"
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + PADDING_BOTTOM_OFFSET }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <RestaurantHero
          imageUrl={restaurant.imageUrl}
          deliveryCost={restaurant.deliveryCost}
          minOrder={restaurant.minOrder}
          topInset={insets.top}
          onBack={handleBack}
        />

        <RestaurantMeta
          name={restaurant.restaurantName}
          shortDesc={restaurant.shortDesc}
          rating={restaurant.rating}
          ratingFeedback={ratingFeedback}
          speciality={restaurant.speciality}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.card,
  },
});
