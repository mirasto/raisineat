import { StyleSheet, View } from 'react-native';
import { theme } from '@/shared/constants';

export interface ChevronLeftProps {
  color?: string;
  size?: number;
}

export const ChevronLeft = ({
  color = theme.colors.textPrimary,
  size = 20,
}: ChevronLeftProps) => {
  const innerSize = Math.round(size * 0.55);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.chevron,
          { width: innerSize, height: innerSize, borderColor: color },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: {
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    transform: [{ rotate: '45deg' }],
    marginLeft: 3,
  },
});
