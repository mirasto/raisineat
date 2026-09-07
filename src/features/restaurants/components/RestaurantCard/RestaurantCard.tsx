import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Badge } from '@/shared/ui';
import { theme } from '@/shared/constants';
import type { Restaurant } from '../../types';

export interface RestaurantCardProps {
  item: Restaurant;
  onPress: (restaurant: Restaurant) => void;
}

export const RestaurantCard = memo(({ item, onPress }: RestaurantCardProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(item)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
        {item.isClosed && (
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

          <Badge
            label={item.deliveryTime}
            variant="info"
            style={styles.deliveryBadge}
            textStyle={styles.deliveryTimeText}
          />
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.metaItem}>
            🚲 {item.deliveryCost.toFixed(2)} {item.currency}
          </Text>
          <Text style={styles.metaItem}>😊 {item.rating.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
});

RestaurantCard.displayName = 'RestaurantCard';

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.xl,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.99 }],
  },
  imageContainer: {
    width: '100%',
    height: 160,
    position: 'relative',
    backgroundColor: theme.colors.background,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  closedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closedText: {
    color: theme.colors.white,
    fontSize: 16,
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
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  deliveryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.sm,
  },
  deliveryTimeText: {
    fontSize: 12,
    fontWeight: '700',
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
    fontWeight: '600',
    color: '#475569',
  },
});
