import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCuisines } from '../hooks/useCuisines';
import { CuisineCard } from '../components/CuisineCard';
import type { CuisineInfo } from '../types';
import type { CuisineListNavigationProp } from '@/navigation';

export const CuisineListScreen = () => {
  const navigation = useNavigation<CuisineListNavigationProp>();
  const { cuisines, isLoading, error, refresh } = useCuisines();

  const handleSelectCuisine = (item: CuisineInfo) => {
    navigation.navigate('Restaurants', { cuisine: item.name });
  };

  if (isLoading && cuisines.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#818CF8" />
      </View>
    );
  }

  if (error && cuisines.length === 0) {
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
        data={cuisines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CuisineCard item={item} onPress={handleSelectCuisine} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
