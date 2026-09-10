import { Text, View } from 'react-native';
import { Badge } from '@/shared/ui';
import { formatRatingLabel } from '@/shared/utils';
import { styles } from './RestaurantMeta.styles';

interface RestaurantMetaProps {
  name: string;
  shortDesc: string;
  rating: number;
  speciality?: string;
}

export const RestaurantMeta = ({ name, shortDesc, rating, speciality }: RestaurantMetaProps) => {
  return (
    <View style={styles.bodyContent}>
      <Text style={styles.restaurantName}>{name}</Text>
      <Text style={styles.restaurantDesc}>{shortDesc}</Text>

      <View style={styles.metaRow}>
        <View style={styles.ratingGroup}>
          <Text style={styles.ratingEmoji}>😊</Text>
          <Text style={styles.ratingText}>{formatRatingLabel(rating)}</Text>
        </View>

        {typeof speciality === 'string' && (
          <Badge
            label={speciality.toUpperCase()}
            variant="info"
            style={styles.specialityBadge}
            textStyle={styles.specialityBadgeText}
          />
        )}
      </View>
    </View>
  );
};
