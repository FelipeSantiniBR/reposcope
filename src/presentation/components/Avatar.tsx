import { Image, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

type Size = 'sm' | 'md' | 'lg';

interface Props {
  uri?: string;
  name: string;
  size?: Size;
}

const dimensionBySize: Record<Size, number> = { sm: 24, md: 40, lg: 64 };

export function Avatar({ uri, name, size = 'md' }: Props) {
  const { colors } = useTheme();
  const dimension = dimensionBySize[size];

  if (!uri) {
    return (
      <View
        style={{
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text fontWeight="700" style={{ color: '#FFFFFF' }}>
          {name.charAt(0).toUpperCase()}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={{ width: dimension, height: dimension, borderRadius: dimension / 2 }}
    />
  );
}
