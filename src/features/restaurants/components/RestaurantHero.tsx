import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronLeft } from '@/shared/ui';
import { theme } from '@/shared/constants';

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
          <Text style={styles.overlayBadgeText}>DELIVERY: {deliveryCost.toFixed(2)}</Text>
        </View>
        <View style={styles.overlayBadge}>
          <Text style={styles.overlayBadgeText}>MIN. ORDER: {minOrder.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    width: '100%',
    height: 320,
    position: 'relative',
    backgroundColor: '#1E293B',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    marginTop: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  heroBadgesOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 10,
  },
  overlayBadge: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.sm,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  overlayBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: 0.5,
  },
});
