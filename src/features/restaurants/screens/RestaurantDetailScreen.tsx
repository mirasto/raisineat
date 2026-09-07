import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from '@/components/ui';
import { useAppSelector } from '@/store';
import { selectRestaurantById } from '@/features/restaurants/model/restaurantSlice';
import type { RestaurantDetailNavigationProp, RestaurantDetailRouteProp } from '@/navigation';

export const RestaurantDetailScreen = () => {
  const navigation = useNavigation<RestaurantDetailNavigationProp>();
  const route = useRoute<RestaurantDetailRouteProp>();
  const insets = useSafeAreaInsets();
  const { restaurantId, title } = route.params;

  const restaurant = useAppSelector((state) => selectRestaurantById(state, restaurantId));

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

          <Pressable
            onPress={handleBack}
            hitSlop={12}
            style={[styles.backButton, { top: Math.max(insets.top + 8, 20) }]}
          >
            <ChevronLeft color="#FFFFFF" size={24} />
          </Pressable>

          <View style={styles.floatingPillContainer}>
            <View style={styles.floatingPill}>
              <Text style={styles.floatingPillText}>
                DELIVERY: {restaurant?.deliveryCost.toFixed(2) ?? '0.00'}
              </Text>
            </View>
            <View style={styles.floatingPill}>
              <Text style={styles.floatingPillText}>
                MIN. ORDER: {restaurant?.minOrder.toFixed(2) ?? '0.00'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.contentBody}>
          <Text style={styles.title}>{displayName}</Text>
          <Text style={styles.description}>{displayDesc}</Text>

          <View style={styles.infoRow}>
            <View style={styles.ratingSection}>
              <Text style={styles.ratingEmoji}>😊</Text>
              <Text style={styles.ratingText}>
                {getRatingFeedback(displayRating)}, {displayRating.toFixed(1)}
              </Text>
            </View>

            <View style={styles.specialityBadge}>
              <Text style={styles.specialityText}>{specialityText}</Text>
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
    flexGrow: 1,
  },
  heroContainer: {
    width: '100%',
    height: 310,
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#CBD5E1',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingPillContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    gap: 8,
  },
  floatingPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  floatingPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.6,
  },
  contentBody: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
    letterSpacing: -0.4,
  },
  description: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: 24,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#334155',
  },
  specialityBadge: {
    backgroundColor: '#E0F2FE',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  specialityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0284C7',
    letterSpacing: 0.6,
  },
});
