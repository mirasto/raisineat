import { useLoginMutation } from '@/api';
import type { LoginCredentials } from '@/features/auth/types';
import { theme } from '@/shared/constants';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LoginForm } from '../components/LoginForm';
import { apiErrorSchema } from '@/api/schemas';

export const LoginScreen = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleLogin = async (credentials: LoginCredentials) => {
    setServerError(null);

    try {
      await login(credentials).unwrap();
    } catch (error: unknown) {
      const result = apiErrorSchema.safeParse(error);

      if (result.success) {
        const message = result.data.data.error || result.data.data.message;
        setServerError(message || 'Invalid email or password');
      } else {
        setServerError('Invalid email or password');
      }
    }
  };

  return (
    <LinearGradient
      colors={[...theme.colors.gradientSplash]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      style={styles.rootContainer}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Pressable style={styles.topSpacer} onPress={Keyboard.dismiss} accessible={false} />

      <View style={styles.formSheet}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <LoginForm
              onSubmit={handleLogin}
              isLoading={isLoading}
              serverError={serverError}
              onClearServerError={() => setServerError(null)}
            />
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
    backgroundColor: theme.colors.card,
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
    flexGrow: 1,
  },
});
