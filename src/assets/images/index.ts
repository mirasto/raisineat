import type { ImageSourcePropType } from 'react-native';
import chineseImage from './CHINESE.jpg';
import italianImage from './ITALIAN.jpg';
import indianImage from './INDIAN.jpg';

export const CUISINE_IMAGES = {
  chinese: chineseImage,
  italian: italianImage,
  indian: indianImage,
} as const satisfies Record<string, ImageSourcePropType>;
