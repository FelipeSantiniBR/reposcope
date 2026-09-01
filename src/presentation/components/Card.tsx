import { View, ViewProps } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export function Card({ style, children, ...props }: ViewProps) {
  const { colors, spacing, radius } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: radius.md,
          padding: spacing.md,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
