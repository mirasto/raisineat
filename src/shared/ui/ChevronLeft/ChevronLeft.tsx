import { StyleSheet, View } from 'react-native';
import { theme } from '@/shared/constants';

export interface ChevronLeftProps {
  color?: string;
}

export const ChevronLeft = ({ color = theme.colors.textPrimary }: ChevronLeftProps) => {
  return <View style={[styles.chevron, { borderColor: color }]} />;
};

const styles = StyleSheet.create({
  chevron: {
    width: 12,
    height: 12,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    transform: [{ rotate: '45deg' }],
  },
});
