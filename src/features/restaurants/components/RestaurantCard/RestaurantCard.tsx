import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Restaurant } from '../../types';

interface RestaurantCardProps {
  item: Restaurant;
  onPress: (restaurant: Restaurant) => void;
}

export const RestaurantCard = ({ item, onPress }: RestaurantCardProps) => {
  const currencySymbol =
    item.currency === 'EUR' ? '€' : item.currency === 'USD' ? '$' : item.currency;

  const deliveryParts = (item.deliveryTime || '').split(' ');
  const deliveryTimeValue = deliveryParts[0] || item.deliveryTime;
  const deliveryTimeUnit = deliveryParts[1] || 'min';

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(item)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
        {item.isOpen ? null : (
          <View style={styles.closedOverlay}>
            <Text style={styles.closedText}>Closed</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.mainRow}>
          <View style={styles.titleColumn}>
            <Text style={styles.title} numberOfLines={1}>
              {item.restaurantName}
            </Text>
            <Text style={styles.description} numberOfLines={1}>
              {item.shortDesc}
            </Text>
          </View>

          <View style={styles.deliveryBadge}>
            <Text style={styles.deliveryTimeText}>{deliveryTimeValue}</Text>
            <Text style={styles.deliveryUnitText}>{deliveryTimeUnit}</Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.metaItem}>
            🚲 {currencySymbol}
            {item.deliveryCost.toFixed(2)}
          </Text>
          <Text style={styles.metaItem}>😊 {item.rating.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  imageContainer: {
    width: '100%',
    height: 165,
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  closedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  content: {
    padding: 14,
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleColumn: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
  },
  deliveryBadge: {
    backgroundColor: '#E0F2FE',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 54,
  },
  deliveryTimeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0284C7',
    lineHeight: 14,
  },
  deliveryUnitText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#0284C7',
    lineHeight: 13,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 12,
    paddingTop: 10,
    gap: 16,
  },
  metaItem: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
});
