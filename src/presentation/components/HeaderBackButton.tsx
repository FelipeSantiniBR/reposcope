import { Pressable } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';

interface Props {
  onPress: () => void;
}

export function HeaderBackButton({ onPress }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <ChevronLeft color={colors.text} size={24} />
    </Pressable>
  );
}
