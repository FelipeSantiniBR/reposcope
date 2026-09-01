import { ActivityIndicator, Pressable, PressableProps } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface Props extends PressableProps {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  ...props
}: Props) {
  const { colors, spacing, radius } = useTheme();

  const paddingBySize = { sm: spacing.sm, md: spacing.md, lg: spacing.lg };
  const isDisabled = disabled || loading;

  const stylesByVariant = {
    primary: { backgroundColor: colors.primary, borderWidth: 0 },
    outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary },
    ghost: { backgroundColor: 'transparent', borderWidth: 0 },
  };

  const textColorByVariant = { primary: '#FFFFFF', outline: colors.primary, ghost: colors.primary };

  return (
    <Pressable
      disabled={isDisabled}
      style={[
        stylesByVariant[variant],
        {
          paddingVertical: paddingBySize[size],
          paddingHorizontal: paddingBySize[size] * 1.5,
          borderRadius: radius.md,
          opacity: isDisabled ? 0.6 : 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator testID="button-loading-indicator" color={textColorByVariant[variant]} />
      ) : (
        <Text fontWeight="600" style={{ color: textColorByVariant[variant] }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
