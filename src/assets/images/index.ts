import type { ImageSourcePropType } from 'react-native';
import chineseImage from './chinese.jpg';
import italianImage from './italian.jpg';
import indianImage from './indian.jpg';

export const CUISINE_IMAGES: Record<string, ImageSourcePropType> = {
  chinese: chineseImage,
  italian: italianImage,
  indian: indianImage,
};

export { chineseImage, italianImage, indianImage };
