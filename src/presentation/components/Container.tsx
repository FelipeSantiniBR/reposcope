import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';

interface Props {
  children: ReactNode;
  style?: ViewStyle;
}

export function Container({ children, style }: Props) {
  const { colors, spacing } = useTheme();

  return (
    <SafeAreaView
      style={[{ flex: 1, padding: spacing.lg, backgroundColor: colors.background }, style]}
    >
      {children}
    </SafeAreaView>
  );
}
