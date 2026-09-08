import { useCallback } from 'react';
import { FlatList, StatusBar, View } from 'react-native';
import { CuisineCard } from '../components/CuisineCard';
import { ScreenState } from '@/shared/ui';
import { theme } from '@/shared/constants';
import { useCuisineList } from '../hooks/useCuisineList';
import type { CuisineItem } from '../types';
import { styles } from './CuisineListScreen.styles';

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
        initialNumToRender={4}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews
        ListEmptyComponent={
          <ScreenState
            isLoading={isLoading}
            error={isError ? 'Failed to load cuisines' : null}
            isEmpty={!isLoading && !isError && cuisines.length === 0}
            emptyMessage="No cuisines found"
            onRetry={refetch}
          />
        }
      />
    </View>
  );
};
