import { useCallback } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { CuisineCard } from '../components/CuisineCard';
import { EmptyState, ErrorState, Loader } from '@/shared/ui';
import { theme } from '@/shared/constants';
import { useCuisineList } from '../hooks/useCuisineList';
import type { CuisineItem } from '../types';

export const CuisineListScreen = () => {
  const {
    cuisines,
    isLoading,
    isFetching,
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
        onPress={() =>
          handleSelectCuisine({ name: item.name, title: item.title })
        }
      />
    ),
    [handleSelectCuisine]
  );

  const keyExtractor = useCallback((item: CuisineItem) => item.name, []);

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
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={isFetching}
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
