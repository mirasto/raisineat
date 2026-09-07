import { StyleSheet, View } from 'react-native';

interface ChevronLeftProps {
  color?: string;
  size?: number;
}

export const ChevronLeft = ({ color = '#0F172A', size = 20 }: ChevronLeftProps) => {
  const innerSize = Math.round(size * 0.55);
  const containerStyle = { width: size, height: size };
  const chevronStyle = { width: innerSize, height: innerSize, borderColor: color };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.chevron, chevronStyle]} />
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
