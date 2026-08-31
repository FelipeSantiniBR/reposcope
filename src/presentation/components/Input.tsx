import { TextInput, TextInputProps, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

interface Props extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, ...props }: Props) {
  const { colors, spacing, radius, fontSizes } = useTheme();

  return (
    <View>
      {label && (
        <Text fontSize="sm" variant="muted" style={{ marginBottom: spacing.xs }}>
          {label}
        </Text>
      )}
      <TextInput
        placeholderTextColor={colors.muted}
        style={{
          borderWidth: 1,
          borderColor: error ? colors.danger : colors.border,
          borderRadius: radius.md,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          fontSize: fontSizes.md,
          color: colors.text,
          backgroundColor: colors.surface,
        }}
        {...props}
      />
      {(error || helperText) && (
        <Text
          fontSize="xs"
          style={{ color: error ? colors.danger : colors.muted, marginTop: spacing.xs }}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
}
