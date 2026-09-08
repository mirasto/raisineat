import { StyleSheet } from 'react-native';
import { theme } from '@/shared/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    minHeight: 280,
  },
  loaderContainer: {
    paddingVertical: theme.spacing.xl * 2,
  },
  messageText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    lineHeight: 22,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    fontWeight: '500',
    lineHeight: 22,
  },
  retryButton: {
    minWidth: 140,
    height: 44,
  },
});
