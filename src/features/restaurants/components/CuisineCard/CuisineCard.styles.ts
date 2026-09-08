import { StyleSheet } from 'react-native';
import { theme } from '@/shared/constants';

export const styles = StyleSheet.create({
  cardContainer: {
    height: 210,
    borderRadius: 20,
    marginBottom: 18,
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
