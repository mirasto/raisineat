import {
  ActivityIndicator,
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { splashLogo } from '@/assets/icons';
import { theme } from '@/shared/constants';
import { useSplashAnimation } from '../hooks/useSplashAnimation';

export const SplashScreen = () => {
  const { fadeAnim, scaleAnim } = useSplashAnimation();

  return (
    <LinearGradient
      colors={[...theme.colors.gradientSplash]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoBadge}>
          <Image source={splashLogo} style={styles.logoImage} resizeMode="contain" />
        </View>

        <Text style={styles.appName}>RaisinEat</Text>
        <Text style={styles.tagline}>Discover Delicious Cuisines</Text>
      </Animated.View>

      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color="#FFFFFF" />
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  logoImage: {
    width: 62,
    height: 62,
  },
  appName: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 8,
    letterSpacing: 0.2,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 52,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 12,
    letterSpacing: 1,
  },
});
