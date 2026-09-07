import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { theme } from '@/shared/constants';

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) => {
  const isBlocked = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isBlocked}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        isBlocked && styles.buttonDisabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.card} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
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
