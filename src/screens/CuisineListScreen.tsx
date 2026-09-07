import { FlatList, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetCuisinesQuery } from '@/api';
import { CuisineCard } from '@/components';
import { Loader } from '@/components/ui';
import type { CuisineListNavigationProp } from '@/navigation';

export const CuisineListScreen = () => {
  const navigation = useNavigation<CuisineListNavigationProp>();
  const { data, isLoading, isFetching, isError, refetch } = useGetCuisinesQuery();

  const cuisines = data?.cuisines ?? [];

  if (isLoading && cuisines.length === 0) {
    return <Loader />;
  }

  if (isError && cuisines.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load cuisines</Text>
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
        data={cuisines}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <CuisineCard
            title={item.title}
            placesCount={item.placesCount}
            image={item.image}
            onPress={() => navigation.navigate('Restaurants', { cuisine: item.name, title: item.title })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={isFetching && !isLoading}
        onRefresh={refetch}
        ListEmptyComponent={
          isLoading ? null : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No cuisines found</Text>
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
