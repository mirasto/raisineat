import { Image, Pressable, Text, View } from 'react-native';
import { ChevronLeft } from '@/shared/ui';
import { theme } from '@/shared/constants';
import { formatCurrency } from '@/shared/utils';
import { styles } from './RestaurantHero.styles';

interface RestaurantHeroProps {
  imageUrl: string;
  deliveryCost: number;
  minOrder: number;
  topInset: number;
  onBack: () => void;
}

export const RestaurantHero = ({
  imageUrl,
  deliveryCost,
  minOrder,
  topInset,
  onBack,
}: RestaurantHeroProps) => {
  return (
    <View style={styles.heroContainer}>
      <Image source={{ uri: imageUrl }} style={styles.heroImage} resizeMode="cover" />

      <Pressable style={[styles.backButton, { top: topInset }]} onPress={onBack} hitSlop={12}>
        <ChevronLeft color={theme.colors.white} />
      </Pressable>

      <View style={styles.heroBadgesOverlay}>
        <View style={styles.overlayBadge}>
          <Text style={styles.overlayBadgeText}>DELIVERY: {formatCurrency(deliveryCost)}</Text>
        </View>
        <View style={styles.overlayBadge}>
          <Text style={styles.overlayBadgeText}>MIN. ORDER: {formatCurrency(minOrder)}</Text>
        </View>
      </View>
    </View>
  );
};
