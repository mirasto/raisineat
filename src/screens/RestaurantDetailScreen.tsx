import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from '@/components/ui';
import { useGetCuisinesQuery } from '@/api';
import type { RestaurantDetailNavigationProp, RestaurantDetailRouteProp } from '@/navigation';

export const RestaurantDetailScreen = () => {
  const navigation = useNavigation<RestaurantDetailNavigationProp>();
  const route = useRoute<RestaurantDetailRouteProp>();
  const insets = useSafeAreaInsets();
  const { restaurantId, title } = route.params;

  const { data } = useGetCuisinesQuery();
  const restaurant = data?.restaurantsById[restaurantId];

  const handleBack = () => {
    navigation.goBack();
  };

  const getRatingFeedback = (rating: number): string => {
    if (rating >= 8.5) {
      return 'Very good';
    }
    if (rating >= 7.5) {
      return 'Good';
    }
    return 'Satisfactory';
  };

  const displayName = restaurant?.restaurantName ?? title ?? 'Restaurant';
  const displayDesc = restaurant?.shortDesc ?? 'Delicious cuisine & specialties';
  const displayRating = restaurant?.rating ?? 8.5;
  const specialityText = (restaurant?.speciality || 'FOOD').toUpperCase();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroContainer}>
          {restaurant?.imageUrl ? (
            <Image
              source={{ uri: restaurant.imageUrl }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.heroPlaceholder} />
          )}

          <View style={styles.heroGradientOverlay} />

          <Pressable
            style={[styles.backButton, { top: insets.top + 8 }]}
            onPress={handleBack}
            hitSlop={12}
          >
            <ChevronLeft color="#FFFFFF" size={24} />
          </Pressable>

          <View style={styles.heroBadgeOverlay}>
            <View style={styles.specialityBadge}>
              <Text style={styles.specialityBadgeText}>{specialityText}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bodyContent}>
          <Text style={styles.restaurantName}>{displayName}</Text>
          <Text style={styles.restaurantDesc}>{displayDesc}</Text>

          <View style={styles.ratingCard}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingBadgeText}>{displayRating.toFixed(1)}</Text>
            </View>
            <View style={styles.ratingInfo}>
              <Text style={styles.ratingFeedback}>{getRatingFeedback(displayRating)}</Text>
              <Text style={styles.ratingSubtext}>Based on verified customer reviews</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Delivery Cost</Text>
              <Text style={styles.infoValue}>
                {restaurant ? `${restaurant.deliveryCost.toFixed(2)} ${restaurant.currency}` : 'Free'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Estimated Delivery</Text>
              <Text style={styles.infoValue}>{restaurant?.deliveryTime ?? '25-35 min'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Minimum Order</Text>
              <Text style={styles.infoValue}>
                {restaurant ? `${restaurant.minOrder.toFixed(2)} ${restaurant.currency}` : '10.00 EUR'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text
                style={[
                  styles.infoValue,
                  restaurant?.isOpen ? styles.statusOpen : styles.statusClosed,
                ]}
              >
                {restaurant?.isOpen ? 'Open Now' : 'Closed'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroContainer: {
    width: '100%',
    height: 280,
    position: 'relative',
    backgroundColor: '#1E293B',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#334155',
  },
  heroGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  heroBadgeOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  specialityBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  specialityBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  bodyContent: {
    padding: 20,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  restaurantDesc: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 20,
  },
  ratingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  ratingBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#818CF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  ratingBadgeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  ratingInfo: {
    flex: 1,
  },
  ratingFeedback: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  ratingSubtext: {
    fontSize: 13,
    color: '#94A3B8',
  },
  infoSection: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  statusOpen: {
    color: '#10B981',
  },
  statusClosed: {
    color: '#EF4444',
  },
});
