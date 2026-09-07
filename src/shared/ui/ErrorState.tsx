import { StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { theme } from '@/shared/constants';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  retryTitle?: string;
}

export const ErrorState = ({
  message,
  onRetry,
  retryTitle = 'Try Again',
}: ErrorStateProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      {Boolean(onRetry) && (
        <Button title={retryTitle} onPress={onRetry} style={styles.button} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  text: {
    fontSize: 16,
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  button: {
    paddingHorizontal: 24,
    height: 44,
  },
});
