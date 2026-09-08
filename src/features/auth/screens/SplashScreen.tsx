import { Animated, Image, StatusBar, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { splashLogo } from '@/assets/icons';
import { theme } from '@/shared/constants';
import { useSplashAnimation } from '../hooks/useSplashAnimation';
import { styles } from './SplashScreen.styles';

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
        <Text style={styles.tagline}>Discover delicious food</Text>
      </Animated.View>

      <View style={styles.footerContainer}>
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    </LinearGradient>
  );
};
