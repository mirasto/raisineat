import type { ImageSourcePropType } from 'react-native';
import chineseImage from './CHINESE.jpg';
import italianImage from './ITALIAN.jpg';
import indianImage from './INDIAN.jpg';

export const CUISINE_IMAGES: Record<string, ImageSourcePropType> = {
  chinese: chineseImage,
  italian: italianImage,
  indian: indianImage,
};

export { chineseImage, italianImage, indianImage };
