import { FlatList, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetCuisinesQuery } from '@/api';
import { RestaurantCard } from '@/components';
import { Loader } from '@/components/ui';
import type { Restaurant } from '@/types';
import type { RestaurantListNavigationProp, RestaurantListRouteProp } from '@/navigation';

export const RestaurantListScreen = () => {
  const navigation = useNavigation<RestaurantListNavigationProp>();
  const route = useRoute<RestaurantListRouteProp>();
  const cuisine = route.params?.cuisine ?? '';

  const { data, isLoading, isFetching, isError, refetch } = useGetCuisinesQuery();

  const restaurants = data?.restaurantsByCuisine[cuisine.toLowerCase()] ?? [];

  const handleSelectRestaurant = (item: Restaurant) => {
    navigation.navigate('Detail', {
      restaurantId: item.id,
      title: item.restaurantName,
    });
  };

  if (isLoading && restaurants.length === 0) {
    return <Loader />;
  }

  if (isError && restaurants.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load restaurants</Text>
        <Pressable style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RestaurantCard item={item} onPress={handleSelectRestaurant} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={isFetching && !isLoading}
        onRefresh={refetch}
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
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
