import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { checkIcon, errorIcon } from '@/assets/icons';
import { Input } from '@/components/ui';
import { useAppDispatch } from '@/store';
import { loginSuccess } from '@/store/authSlice';
import { useLoginMutation } from '@/api';
import { isValidEmail, isValidPassword, validateLoginForm } from '@/utils/validation';
import type { AuthFormErrors } from '@/types';

export const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<AuthFormErrors>({});

  const clearErrors = () => {
    setError(null);
    setFieldErrors({});
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (fieldErrors.email || error) {
      clearErrors();
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (fieldErrors.password || error) {
      clearErrors();
    }
  };

  const handleClearEmail = () => {
    setEmail('');
    clearErrors();
  };

  const handleClearPassword = () => {
    setPassword('');
    clearErrors();
  };

  const handleSignIn = async () => {
    const validation = validateLoginForm({ email, password });
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }

    clearErrors();
    const result = await login({ email, password });
    if ('data' in result && result.data) {
      dispatch(loginSuccess(result.data));
    } else {
      const errorData = result.error as { data?: { error?: string } };
      setError(errorData?.data?.error ?? 'Invalid email or password');
    }
  };

  const isEmailValid = isValidEmail(email);
  const isPasswordValid = isValidPassword(password);
  const isFormReady = isEmailValid && isPasswordValid;

  const renderEmailAccessory = () => {
    if (!email) {
      return null;
    }
    if (fieldErrors.email) {
      return (
        <Pressable onPress={handleClearEmail} hitSlop={8}>
          <Image source={errorIcon} style={styles.statusIcon} />
        </Pressable>
      );
    }
    if (isEmailValid) {
      return <Image source={checkIcon} style={styles.statusIcon} />;
    }
    return (
      <Pressable onPress={handleClearEmail} hitSlop={8}>
        <Image source={errorIcon} style={styles.statusIcon} />
      </Pressable>
    );
  };

  const renderPasswordAccessory = () => {
    if (!password) {
      return null;
    }
    if (fieldErrors.password) {
      return (
        <Pressable onPress={handleClearPassword} hitSlop={8}>
          <Image source={errorIcon} style={styles.statusIcon} />
        </Pressable>
      );
    }
    if (isPasswordValid) {
      return <Image source={checkIcon} style={styles.statusIcon} />;
    }
    return null;
  };

  return (
    <LinearGradient
      colors={['#38BDF8', '#818CF8', '#A855F7', '#C026D3']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      style={styles.rootContainer}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.topSpacer} />

      <View style={styles.formSheet}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Hello there, sign in to continue!</Text>

            {error ? (
              <View style={styles.generalErrorBanner}>
                <Text style={styles.generalErrorText}>{error}</Text>
              </View>
            ) : null}

            <Input
              label="Username or email"
              placeholder="Enter username or email"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              error={fieldErrors.email}
              rightElement={renderEmailAccessory()}
            />

            <Input
              label="Password"
              placeholder="Enter password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
              error={fieldErrors.password}
              rightElement={renderPasswordAccessory()}
            />

            <Pressable
              onPress={handleSignIn}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.signInButton,
                isFormReady ? styles.signInButtonActive : styles.signInButtonDisabled,
                pressed && styles.signInButtonPressed,
              ]}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.signInButtonText}>Sign in</Text>
              )}
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  topSpacer: {
    flex: 1,
    minHeight: 80,
  },
  formSheet: {
    flex: 4,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 6,
    marginBottom: 28,
  },
  generalErrorBanner: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  generalErrorText: {
    color: '#DC2626',
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
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  signInButtonActive: {
    backgroundColor: '#818CF8',
    shadowColor: '#818CF8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  signInButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },
  signInButtonPressed: {
    opacity: 0.85,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
