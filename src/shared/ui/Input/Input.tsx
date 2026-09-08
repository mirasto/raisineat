import { theme } from '@/shared/constants';
import React, { forwardRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  statusIcon?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      statusIcon,
      placeholderTextColor = theme.colors.textMuted,
      ...restProps
    },
    ref
  ) => {
    const hasError = Boolean(error);

    return (
      <View style={[styles.container]}>
        <Text style={styles.label}>{label}</Text>

        <View style={[styles.inputContainer, hasError && styles.inputError]}>
          <TextInput
            ref={ref}
            style={[styles.input]}
            placeholderTextColor={placeholderTextColor}
            {...restProps}
          />
          {Boolean(statusIcon) && <View style={styles.statusIcon}>{statusIcon}</View>}
        </View>

        {hasError ? <Text style={styles.errorText}>{error}</Text> : null}
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
  statusIcon: {
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
