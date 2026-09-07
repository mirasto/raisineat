import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RestaurantDetailRouteProp } from '@/navigation';

export const RestaurantDetailScreen = () => {
  const route = useRoute<RestaurantDetailRouteProp>();
  const { restaurantId, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title ?? 'Restaurant Detail'}</Text>
      <Text style={styles.subtitle}>ID: {restaurantId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
  },
});
