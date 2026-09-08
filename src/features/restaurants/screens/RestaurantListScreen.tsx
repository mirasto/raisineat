import { useCallback } from 'react';
import { FlatList, StatusBar, View } from 'react-native';
import { RestaurantCard } from '../components/RestaurantCard';
import { ScreenState } from '@/shared/ui';
import { theme } from '@/shared/constants';
import { useRestaurantList } from '../hooks/useRestaurantList';
import type { Restaurant } from '../types';
import { styles } from './RestaurantListScreen.styles';

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
        ListEmptyComponent={
          <ScreenState
            isLoading={isLoading}
            error={isError ? 'Failed to load restaurants' : null}
            isEmpty={!isLoading && !isError && restaurants.length === 0}
            emptyMessage="No restaurants found"
            onRetry={refetch}
          />
        }
      />
    </View>
  );
};
