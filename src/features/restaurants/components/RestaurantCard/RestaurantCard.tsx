import { memo } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Badge } from '@/shared/ui';
import { formatCurrency, formatRating } from '@/shared/utils';
import type { Restaurant } from '../../types';
import { styles } from './RestaurantCard.styles';

interface RestaurantCardProps {
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
        {!item.isAvailable && (
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
            🚲 {formatCurrency(item.deliveryCost, item.currency)}
          </Text>
          <Text style={styles.metaItem}>😊 {formatRating(item.rating)}</Text>
        </View>
      </View>
    </Pressable>
  );
});

RestaurantCard.displayName = 'RestaurantCard';
