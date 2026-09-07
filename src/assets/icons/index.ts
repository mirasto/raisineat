import type { ImageSourcePropType } from 'react-native';
import errorIcon from './error.png';
import checkIcon from './check.png';
import splashLogo from './splash_logo.png';

export const ICONS: Record<string, ImageSourcePropType> = {
  error: errorIcon,
  check: checkIcon,
  splashLogo,
};

export { errorIcon, checkIcon, splashLogo };
