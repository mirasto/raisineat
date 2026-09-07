import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { CUISINE_IMAGES } from '@/assets/images';
import type { CuisineInfo } from '../../types';

interface CuisineCardProps {
  item: CuisineInfo;
  onPress: (cuisine: CuisineInfo) => void;
}

export const CuisineCard = ({ item, onPress }: CuisineCardProps) => {
  const imageSource = CUISINE_IMAGES[item.name.toLowerCase()];

  return (
    <Pressable
      style={({ pressed }) => [styles.cardContainer, pressed && styles.cardPressed]}
      onPress={() => onPress(item)}
    >
      <ImageBackground
        source={imageSource}
        style={styles.cardBackground}
        imageStyle={styles.cardImage}
        resizeMode="cover"
      >
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.placesCount}>{item.totalCount} places</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 210,
    borderRadius: 20,
    marginBottom: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: '#F3F4F6',
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  cardBackground: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
    justifyContent: 'flex-start',
  },
  cardImage: {
    borderRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },
  placesCount: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
});
