import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Restaurant } from '../types';

interface RestaurantCardProps {
  item: Restaurant;
  onPress: (restaurant: Restaurant) => void;
}

export const RestaurantCard = ({ item, onPress }: RestaurantCardProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(item)}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.restaurantName}</Text>
        <View style={[styles.badge, item.isOpen ? styles.badgeOpen : styles.badgeClosed]}>
          <Text
            style={[styles.badgeText, item.isOpen ? styles.badgeTextOpen : styles.badgeTextClosed]}
          >
            {item.isOpen ? 'Open' : 'Closed'}
          </Text>
        </View>
      </View>
      <Text style={styles.description}>{item.shortDesc}</Text>
      <View style={styles.footerRow}>
        <Text style={styles.metaText}>⭐ {item.rating}</Text>
        <Text style={styles.metaText}>⏱ {item.deliveryTime}</Text>
        <Text style={styles.metaText}>
          {item.currency} {item.deliveryCost.toFixed(2)} delivery
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.85,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeOpen: {
    backgroundColor: '#DCFCE7',
  },
  badgeClosed: {
    backgroundColor: '#FEE2E2',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeTextOpen: {
    color: '#15803D',
  },
  badgeTextClosed: {
    color: '#B91C1C',
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaText: {
    fontSize: 13,
    color: '#475569',
  },
});
