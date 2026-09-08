import { StyleSheet } from 'react-native';
import { theme } from '@/shared/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    marginTop: 6,
    marginBottom: 28,
  },
  generalErrorBanner: {
    backgroundColor: theme.colors.errorLight,
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: theme.borderRadius.md,
    padding: 12,
    marginBottom: 20,
  },
  generalErrorText: {
    color: theme.colors.error,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  statusIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  signInButton: {
    height: 52,
    borderRadius: theme.borderRadius.lg,
    marginTop: 16,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
