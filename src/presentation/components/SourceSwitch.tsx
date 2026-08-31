import { Pressable, View } from 'react-native';
import { useDataSource } from '../../infrastructure/di/DataSourceProvider';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export function SourceSwitch() {
  const { colors, spacing, radius } = useTheme();
  const { sourceName, setSourceName } = useDataSource();

  const options: Array<{ key: 'github' | 'gitlab'; label: string }> = [
    { key: 'github', label: 'GitHub' },
    { key: 'gitlab', label: 'GitLab' },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        padding: spacing.xs / 2,
      }}
    >
      {options.map((option) => {
        const isActive = sourceName === option.key;
        return (
          <Pressable
            key={option.key}
            onPress={() => setSourceName(option.key)}
            style={{
              flex: 1,
              paddingVertical: spacing.sm,
              borderRadius: radius.sm,
              backgroundColor: isActive ? colors.background : 'transparent',
              alignItems: 'center',
            }}
          >
            <Text
              fontSize="sm"
              fontWeight={isActive ? '700' : '400'}
              style={{ color: isActive ? colors.text : colors.muted }}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
