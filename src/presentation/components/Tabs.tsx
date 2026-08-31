import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';
import { Spacing } from './Spacing';

interface TabItem<T extends string> {
  key: T;
  label: string;
  content: ReactNode;
}

interface Props<T extends string> {
  items: TabItem<T>[];
  activeKey: T;
  onChange: (key: T) => void;
}

export function Tabs<T extends string>({ items, activeKey, onChange }: Props<T>) {
  const { spacing, colors } = useTheme();
  const activeItem = items.find((item) => item.key === activeKey);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border }}
      >
        {items.map((item) => (
          <Pressable
            key={item.key}
            onPress={() => onChange(item.key)}
            style={{
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.md,
              borderBottomWidth: 2,
              borderBottomColor: activeKey === item.key ? colors.primary : 'transparent',
            }}
          >
            <Text
              fontWeight={activeKey === item.key ? '700' : '400'}
              style={{ color: activeKey === item.key ? colors.primary : colors.muted }}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <Spacing />

      <View style={{ flex: 1 }}>{activeItem?.content}</View>
    </View>
  );
}
