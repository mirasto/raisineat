import { useCallback } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { RestaurantCard } from '../components/RestaurantCard';
import { EmptyState, ErrorState, Loader } from '@/shared/ui';
import { theme } from '@/shared/constants';
import { useRestaurantList } from '../hooks/useRestaurantList';
import type { Restaurant } from '../types';

export const RestaurantListScreen = () => {
  const {
    restaurants,
    isLoading,
    isFetching,
    isError,
    refetch,
    handleSelectRestaurant,
  } = useRestaurantList();

  const renderItem = useCallback(
    ({ item }: { item: Restaurant }) => (
      <RestaurantCard item={item} onPress={handleSelectRestaurant} />
    ),
    [handleSelectRestaurant]
  );

  const keyExtractor = useCallback((item: Restaurant) => item.id, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorState message="Failed to load restaurants" onRetry={refetch} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.card} />
      <FlatList
        data={restaurants}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={isFetching}
        onRefresh={refetch}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews
        ListEmptyComponent={<EmptyState message="No restaurants found" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.md,
  },
});
