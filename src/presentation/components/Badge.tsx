import { View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

interface Props {
  label: string;
  tone?: 'default' | 'success' | 'warning' | 'danger';
}

export function Badge({ label, tone = 'default' }: Props) {
  const { colors, spacing, radius } = useTheme();

  const colorByTone = {
    default: colors.primary,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
  };

  return (
    <View
      style={{
        backgroundColor: colorByTone[tone],
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs / 2,
        borderRadius: radius.sm,
        alignSelf: 'flex-start',
      }}
    >
      <Text fontSize="sm" style={{ color: '#FFFFFF' }}>
        {label}
      </Text>
    </View>
  );
}
