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
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LoginForm } from '../components/LoginForm';
import { apiErrorSchema } from '@/api/schemas';
import { styles } from './LoginScreen.styles';

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
