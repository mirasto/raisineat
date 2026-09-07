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
import { loginSuccess } from '../model/authSlice';
import { useLogin } from '../hooks/useLogin';
import { isValidEmail, isValidPassword } from '../utils/validation';

export const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, error, fieldErrors, submit, clearErrors } = useLogin({
    onSuccess: (data) => {
      dispatch(loginSuccess(data));
    },
  });

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
    await submit({ email, password });
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
    height: '38%',
  },
  formSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 28,
    paddingTop: 36,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 10,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    color: '#0B1527',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#7E8B9B',
    marginTop: 6,
    marginBottom: 32,
  },
  generalErrorBanner: {
    backgroundColor: '#FEE2E2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  generalErrorText: {
    color: '#DC2626',
    fontSize: 14,
  },
  signInButton: {
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  signInButtonActive: {
    backgroundColor: '#818CF8',
  },
  signInButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },
  signInButtonPressed: {
    opacity: 0.85,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusIcon: {
    width: 22,
    height: 22,
  },
});
