import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { theme } from '@/constants/theme';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  loading?: boolean;
  style?: ViewStyle;
}

export const Button = ({
  title,
  loading = false,
  disabled = false,
  style,
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.card} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: theme.colors.primaryPressed,
    opacity: 0.9,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.border,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.card,
  },
});
