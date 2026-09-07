import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { SplashScreenNavigationProp } from '@/navigation';

const SPLASH_ANIMATION = {
  FADE_DURATION_MS: 900,
  SCALE_INITIAL: 0.85,
  SPRING_FRICTION: 6,
  SPRING_TENSION: 40,
  DISPLAY_DURATION_MS: 2_400,
} as const;

export const useSplashAnimation = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(
    new Animated.Value(SPLASH_ANIMATION.SCALE_INITIAL)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: SPLASH_ANIMATION.FADE_DURATION_MS,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: SPLASH_ANIMATION.SPRING_FRICTION,
        tension: SPLASH_ANIMATION.SPRING_TENSION,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, SPLASH_ANIMATION.DISPLAY_DURATION_MS);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return {
    fadeAnim,
    scaleAnim,
  };
};
