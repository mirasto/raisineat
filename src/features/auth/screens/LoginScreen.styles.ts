import { StyleSheet } from 'react-native';
import { theme } from '@/shared/constants';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  topSpacer: {
    flex: 1,
    minHeight: 80,
  },
  formSheet: {
    flex: 4,
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 48,
    flexGrow: 1,
  },
});
