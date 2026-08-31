import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { fontSizes } from '../theme/FontSizes';

type Variant = 'body' | 'muted' | 'heading';
type FontSize = keyof typeof fontSizes;

interface Props extends RNTextProps {
  variant?: Variant;
  fontSize?: FontSize;
  fontWeight?: TextStyle['fontWeight'];
}

export function Text({
  children,
  variant = 'body',
  fontSize = 'md',
  fontWeight,
  style,
  ...props
}: Props) {
  const { colors, fontSizes } = useTheme();

  const colorByVariant = { body: colors.text, muted: colors.muted, heading: colors.text };
  const weightByVariant = variant === 'heading' ? '700' : '400';

  return (
    <RNText
      style={[
        {
          color: colorByVariant[variant],
          fontSize: fontSizes[fontSize],
          fontWeight: fontWeight ?? weightByVariant,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}
