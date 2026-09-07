import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { theme } from '@/shared/constants';

export type BadgeVariant = 'success' | 'danger' | 'info' | 'default';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Badge = ({
  label,
  variant = 'default',
  style,
  textStyle,
}: BadgeProps) => {
  return (
    <View style={[styles.badge, styles[variant], style]}>
      <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  default: {
    backgroundColor: theme.colors.inputBg,
  },
  success: {
    backgroundColor: theme.colors.successLight,
  },
  danger: {
    backgroundColor: theme.colors.errorLight,
  },
  info: {
    backgroundColor: '#E0F2FE',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  defaultText: {
    color: theme.colors.textSecondary,
  },
  successText: {
    color: theme.colors.success,
  },
  dangerText: {
    color: '#B91C1C',
  },
  infoText: {
    color: '#0284C7',
  },
});
