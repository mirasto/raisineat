import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { SplashScreenNavigationProp } from '@/navigation';

export const useSplashAnimation = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2400);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return {
    fadeAnim,
    scaleAnim,
  };
};
