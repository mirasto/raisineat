import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRestaurants } from '../hooks/useRestaurants';
import { RestaurantCard } from '../components/RestaurantCard';
import type { Restaurant } from '../types';
import type { RestaurantListNavigationProp, RestaurantListRouteProp } from '@/navigation';

export const RestaurantListScreen = () => {
  const navigation = useNavigation<RestaurantListNavigationProp>();
  const route = useRoute<RestaurantListRouteProp>();
  const cuisine = route.params?.cuisine ?? '';

  const { restaurants, isLoading, error, refresh } = useRestaurants({ cuisine });

  const handleSelectRestaurant = (item: Restaurant) => {
    navigation.navigate('Detail', {
      restaurantId: item.id,
      title: item.restaurantName,
    });
  };

  if (isLoading && restaurants.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#818CF8" />
      </View>
    );
  }

  if (error && restaurants.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={refresh}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RestaurantCard item={item} onPress={handleSelectRestaurant} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? null : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No restaurants found</Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#94A3B8',
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#818CF8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
