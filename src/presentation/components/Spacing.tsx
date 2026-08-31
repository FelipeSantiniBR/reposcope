import { View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { spacing as spacingScale } from '../theme/Spacing';

interface Props {
  size?: keyof typeof spacingScale;
  direction?: 'horizontal' | 'vertical';
}

export function Spacing({ size = 'md', direction = 'vertical' }: Props) {
  const { spacing } = useTheme();
  const value = spacing[size];

  return <View style={direction === 'horizontal' ? { width: value } : { height: value }} />;
}
