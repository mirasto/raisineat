import { memo } from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { theme } from '@/constants/theme';

export const CUISINE_CARD_HEIGHT = 210;
export const CUISINE_CARD_MARGIN_BOTTOM = 18;
export const CUISINE_CARD_TOTAL_HEIGHT = CUISINE_CARD_HEIGHT + CUISINE_CARD_MARGIN_BOTTOM;

export interface CuisineCardProps {
  title: string;
  placesCount: number;
  image: ImageSourcePropType;
  onPress: () => void;
}

export const CuisineCard = memo(({ title, placesCount, image, onPress }: CuisineCardProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.cardContainer, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <ImageBackground
        source={image}
        style={styles.cardBackground}
        imageStyle={styles.cardImage}
        resizeMode="cover"
      >
        <View style={styles.headerRow}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.placesCount}>{placesCount} places</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
});

CuisineCard.displayName = 'CuisineCard';

const styles = StyleSheet.create({
  cardContainer: {
    height: CUISINE_CARD_HEIGHT,
    borderRadius: 20,
    marginBottom: CUISINE_CARD_MARGIN_BOTTOM,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: theme.colors.inputBg,
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
    color: theme.colors.textPrimary,
  },
  placesCount: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
});
