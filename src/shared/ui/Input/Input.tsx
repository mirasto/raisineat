import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import { theme } from '@/shared/constants';

export interface InputProps {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  error?: string;
  rightIcon?: React.ReactNode;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: StyleProp<TextStyle>;
}

export const Input = ({
  label,
  value,
  placeholder,
  onChangeText,
  error,
  rightIcon,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
}: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, Boolean(error) && styles.inputError]}>
        <TextInput
          style={[styles.input, style]}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={theme.colors.textMuted}
        />
        {Boolean(rightIcon) && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBg,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    height: 54,
  },
  inputError: {
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.textPrimary,
    paddingVertical: 0,
  },
  rightIcon: {
    marginLeft: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 12,
    color: theme.colors.error,
    marginTop: 6,
  },
});
