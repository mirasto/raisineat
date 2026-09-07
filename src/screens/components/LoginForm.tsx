import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { checkIcon, errorIcon } from '@/assets/icons';
import { Button, Input } from '@/components/ui';
import { theme } from '@/constants/theme';
import type { AuthFormErrors } from '@/types';

interface LoginFormProps {
  email: string;
  password: string;
  isLoading: boolean;
  generalError: string | null;
  fieldErrors: AuthFormErrors;
  shouldShowEmailError?: boolean;
  shouldShowEmailSuccess?: boolean;
  shouldShowPasswordError?: boolean;
  shouldShowPasswordSuccess?: boolean;
  showEmailError?: boolean;
  showEmailSuccess?: boolean;
  showPasswordError?: boolean;
  showPasswordSuccess?: boolean;
  onEmailChange?: (text: string) => void;
  onPasswordChange?: (text: string) => void;
  onChangeEmail?: (text: string) => void;
  onChangePassword?: (text: string) => void;
  onClearEmail: () => void;
  onClearPassword: () => void;
  onSubmit: () => void;
}

export const LoginForm = ({
  email,
  password,
  isLoading,
  generalError,
  fieldErrors,
  shouldShowEmailError,
  shouldShowEmailSuccess,
  shouldShowPasswordError,
  shouldShowPasswordSuccess,
  showEmailError,
  showEmailSuccess,
  showPasswordError,
  showPasswordSuccess,
  onEmailChange,
  onPasswordChange,
  onChangeEmail,
  onChangePassword,
  onClearEmail,
  onClearPassword,
  onSubmit,
}: LoginFormProps) => {
  const isEmailError = shouldShowEmailError ?? showEmailError ?? false;
  const isEmailSuccess = shouldShowEmailSuccess ?? showEmailSuccess ?? false;
  const isPasswordError = shouldShowPasswordError ?? showPasswordError ?? false;
  const isPasswordSuccess = shouldShowPasswordSuccess ?? showPasswordSuccess ?? false;
  const handleEmailInput = onEmailChange ?? onChangeEmail;
  const handlePasswordInput = onPasswordChange ?? onChangePassword;

  const renderEmailAccessory = () => {
    if (isEmailError) {
      return (
        <Pressable onPress={onClearEmail} hitSlop={8}>
          <Image source={errorIcon} style={styles.statusIcon} />
        </Pressable>
      );
    }
    if (isEmailSuccess) {
      return <Image source={checkIcon} style={styles.statusIcon} />;
    }
    return null;
  };

  const renderPasswordAccessory = () => {
    if (isPasswordError) {
      return (
        <Pressable onPress={onClearPassword} hitSlop={8}>
          <Image source={errorIcon} style={styles.statusIcon} />
        </Pressable>
      );
    }
    if (isPasswordSuccess) {
      return <Image source={checkIcon} style={styles.statusIcon} />;
    }
    return null;
  };

  return (
    <View>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Hello there, sign in to continue!</Text>

      {generalError ? (
        <View style={styles.generalErrorBanner}>
          <Text style={styles.generalErrorText}>{generalError}</Text>
        </View>
      ) : null}

      <Input
        label="Username or email"
        placeholder="Enter username or email"
        value={email}
        onChangeText={handleEmailInput}
        keyboardType="email-address"
        autoCapitalize="none"
        error={fieldErrors.email}
        rightElement={renderEmailAccessory()}
      />

      <Input
        label="Password"
        placeholder="Enter password"
        value={password}
        onChangeText={handlePasswordInput}
        secureTextEntry
        error={fieldErrors.password}
        rightElement={renderPasswordAccessory()}
      />

      <Button
        title="Sign in"
        onPress={onSubmit}
        loading={isLoading}
        style={styles.signInButton}
        textStyle={styles.signInButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
