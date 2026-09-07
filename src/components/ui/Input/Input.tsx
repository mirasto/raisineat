import { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { theme } from '@/constants/theme';

export interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, rightElement, style, ...rest }, ref) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.inputContainer, error ? styles.inputError : null]}>
          <TextInput
            ref={ref}
            style={[styles.input, style]}
            placeholderTextColor={theme.colors.textMuted}
            autoCapitalize="none"
            {...rest}
          />
          {rightElement ? <View style={styles.rightElement}>{rightElement}</View> : null}
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    );
  }
);

Input.displayName = 'Input';

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
  rightElement: {
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
