import { useState } from 'react';
import {
  ActivityIndicator,
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
import { InputRow } from '../components/InputRow';
import { useLogin } from '../hooks/useLogin';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, error, fieldErrors, submit, clearErrors } = useLogin();

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

  const handleSignIn = async () => {
    await submit({ email, password });
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

            <InputRow
              label="Username or email"
              placeholder="Enter username or email"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              error={fieldErrors.email}
            />

            <InputRow
              label="Password"
              placeholder="Enter password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
              error={fieldErrors.password}
            />

            <Pressable
              onPress={handleSignIn}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.signInButton,
                pressed && styles.signInButtonPressed,
                isLoading && styles.signInButtonDisabled,
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
    backgroundColor: '#818CF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  signInButtonPressed: {
    opacity: 0.8,
  },
  signInButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
