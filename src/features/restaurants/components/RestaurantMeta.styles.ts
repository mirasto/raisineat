import { StyleSheet } from 'react-native';
import { theme } from '@/shared/constants';

export const styles = StyleSheet.create({
  bodyContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 6,
  },
  restaurantDesc: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingEmoji: {
    fontSize: 18,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  specialityBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.sm,
  },
  specialityBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
