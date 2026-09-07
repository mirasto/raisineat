import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '@/constants/theme';
import { LoginForm } from './components/LoginForm';
import { useLoginForm } from './hooks/useLoginForm';

export const LoginScreen = () => {
  const formState = useLoginForm();

  return (
    <LinearGradient
      colors={[...theme.colors.gradientSplash]}
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
            <LoginForm
              email={formState.email}
              password={formState.password}
              isLoading={formState.isLoading}
              generalError={formState.generalError}
              fieldErrors={formState.fieldErrors}
              shouldShowEmailError={formState.shouldShowEmailError}
              shouldShowEmailSuccess={formState.shouldShowEmailSuccess}
              shouldShowPasswordError={formState.shouldShowPasswordError}
              shouldShowPasswordSuccess={formState.shouldShowPasswordSuccess}
              onEmailChange={formState.handleEmailChange}
              onPasswordChange={formState.handlePasswordChange}
              onClearEmail={formState.handleClearEmail}
              onClearPassword={formState.handleClearPassword}
              onSubmit={formState.handleSignIn}
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
  },
});
