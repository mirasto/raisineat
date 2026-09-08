import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { checkIcon, errorIcon } from '@/assets/icons';
import { Button, Input } from '@/shared/ui';
import { theme } from '@/shared/constants';
import type { LoginCredentials } from '../types';
import { useLoginForm } from '../hooks/useLoginForm';

interface LoginFormProps {
  onSubmit: (data: LoginCredentials) => void;
  isLoading: boolean;
  serverError?: string | null;
  onClearServerError?: () => void;
}

export const LoginForm = ({
  onSubmit,
  isLoading,
  serverError,
  onClearServerError,
}: LoginFormProps) => {
  const {
    control,
    errors,
    handleClearField,
    createChangeHandler,
    isFieldError,
    isFieldSuccess,
    onSubmitForm,
  } = useLoginForm({
    onSubmit,
    serverError,
    onClearServerError,
  });

  const renderStatusIcon = (fieldName: keyof LoginCredentials, value: string) => {
    if (isFieldError(fieldName, value)) {
      return (
        <Pressable onPress={() => handleClearField(fieldName)} hitSlop={8}>
          <Image source={errorIcon} style={styles.statusIcon} />
        </Pressable>
      );
    }

    if (isFieldSuccess(fieldName, value)) {
      return <Image source={checkIcon} style={styles.statusIcon} />;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Hello there, sign in to continue!</Text>

      {serverError ? (
        <View style={styles.generalErrorBanner}>
          <Text style={styles.generalErrorText}>{serverError}</Text>
        </View>
      ) : null}

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Username or email"
            placeholder="Enter username or email"
            value={value}
            onChangeText={createChangeHandler(onChange)}
            keyboardType="email-address"
            autoCapitalize="none"
            onBlur={onBlur}
            error={errors.email?.message}
            statusIcon={renderStatusIcon('email', value)}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Password"
            placeholder="Enter password"
            value={value}
            onChangeText={createChangeHandler(onChange)}
            onBlur={onBlur}
            secureTextEntry
            error={errors.password?.message}
            statusIcon={renderStatusIcon('password', value)}
          />
        )}
      />

      <Button
        title="Sign in"
        onPress={onSubmitForm}
        loading={isLoading}
        style={styles.signInButton}
        textStyle={styles.signInButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
