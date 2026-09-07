import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/shared/constants';

interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  text: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});
