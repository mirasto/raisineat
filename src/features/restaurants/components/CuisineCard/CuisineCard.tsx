import { memo } from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from 'react-native';
import { formatPlaceCount } from '@/shared/utils';
import { styles } from './CuisineCard.styles';

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
          <Text style={styles.placesCount}>{formatPlaceCount(placesCount)}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
});

CuisineCard.displayName = 'CuisineCard';
