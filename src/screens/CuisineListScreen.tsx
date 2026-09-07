import { useCallback } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { CuisineCard, CUISINE_CARD_TOTAL_HEIGHT } from '@/components';
import { EmptyState, ErrorState, Loader } from '@/components/ui';
import { theme } from '@/constants/theme';
import { useCuisineList } from './hooks/useCuisineList';
import type { CuisineItem } from '@/types';

export const CuisineListScreen = () => {
  const {
    cuisines,
    isLoading,
    isRefreshing,
    isError,
    refetch,
    handleSelectCuisine,
  } = useCuisineList();

  const renderItem = useCallback(
    ({ item }: { item: CuisineItem }) => (
      <CuisineCard
        title={item.title}
        placesCount={item.placesCount}
        image={item.image}
        onPress={() => handleSelectCuisine(item.name, item.title)}
      />
    ),
    [handleSelectCuisine]
  );

  const keyExtractor = useCallback((item: CuisineItem) => item.name, []);

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: CUISINE_CARD_TOTAL_HEIGHT,
      offset: CUISINE_CARD_TOTAL_HEIGHT * index,
      index,
    }),
    []
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorState message="Failed to load cuisines" onRetry={refetch} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.card} />
      <FlatList
        data={cuisines}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={refetch}
        ListEmptyComponent={<EmptyState message="No cuisines found" />}
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
