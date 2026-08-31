import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { Tabs } from '../components/Tabs';
import { SourceSwitch } from '../components/SourceSwitch';
import { Spacing } from '../components/Spacing';

type ShowcaseTab = 'one' | 'two' | 'three';

export function ShowcaseScreen() {
  const { spacing } = useTheme();
  const [tab, setTab] = useState<ShowcaseTab>('one');

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text fontSize="xl" fontWeight="700">
          Design System
        </Text>
        <Spacing />

        <Text fontWeight="bold">Text</Text>
        <Spacing size="sm" />
        <View style={{ gap: spacing.xs }}>
          <Text variant="heading">Heading</Text>
          <Text variant="body">Body</Text>
          <Text variant="muted">Muted</Text>
          <Spacing size="sm" />
          <Text fontSize="xxs">xxs</Text>
          <Text fontSize="xs">xs</Text>
          <Text fontSize="sm">sm</Text>
          <Text fontSize="md">md</Text>
          <Text fontSize="lg">lg</Text>
          <Text fontSize="xl">xl</Text>
          <Text fontSize="xxl">xxl</Text>
          <Text fontSize="xxxl">xxxl</Text>
          <Spacing size="sm" />
          <Text fontWeight="400">Weight 400</Text>
          <Text fontWeight="700">Weight 700</Text>
        </View>
        <Spacing />

        <Text fontWeight="bold">Button</Text>
        <Spacing size="sm" />
        <View style={{ gap: spacing.sm }}>
          <Button label="Primary" variant="primary" onPress={() => {}} />
          <Button label="Outline" variant="outline" onPress={() => {}} />
          <Button label="Ghost" variant="ghost" onPress={() => {}} />
          <Spacing size="sm" />
          <Button label="Small" variant="primary" size="sm" onPress={() => {}} />
          <Button label="Medium" variant="primary" size="md" onPress={() => {}} />
          <Button label="Large" variant="primary" size="lg" onPress={() => {}} />
          <Spacing size="sm" />
          <Button label="Loading" variant="primary" loading onPress={() => {}} />
          <Button label="Disabled" variant="primary" disabled onPress={() => {}} />
        </View>
        <Spacing />

        <Text fontWeight="bold">Badge</Text>
        <Spacing size="sm" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          <Badge label="Default" tone="default" />
          <Badge label="Success" tone="success" />
          <Badge label="Warning" tone="warning" />
          <Badge label="Danger" tone="danger" />
        </View>
        <Spacing />

        <Text fontWeight="bold">Input</Text>
        <Spacing size="sm" />
        <View style={{ gap: spacing.md }}>
          <Input label="Label" placeholder="Placeholder" />
          <Input label="Com texto de ajuda" placeholder="Placeholder" helperText="Texto de ajuda" />
          <Input label="Com erro" placeholder="Placeholder" error="Mensagem de erro" />
        </View>
        <Spacing />

        <Text fontWeight="bold">Card</Text>
        <Spacing size="sm" />
        <Card>
          <Text fontWeight="700">Título do card</Text>
          <Spacing size="xs" />
          <Text variant="muted" fontSize="sm">
            Conteúdo dentro de um Card.
          </Text>
        </Card>
        <Spacing />

        <Text fontWeight="bold">Avatar</Text>
        <Spacing size="sm" />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <Avatar name="user" size="sm" />
          <Avatar name="user" size="md" />
          <Avatar name="user" size="lg" />
          <Avatar
            name="user"
            size="lg"
            uri="https://avatars.githubusercontent.com/u/1?v=4"
          />
        </View>
        <Spacing />

        <Text fontWeight="bold">Tabs</Text>
        <Spacing size="sm" />
        <View style={{ height: 120 }}>
          <Tabs
            items={[
              { key: 'one', label: 'Aba 1', content: <Text>Conteúdo da aba 1</Text> },
              { key: 'two', label: 'Aba 2', content: <Text>Conteúdo da aba 2</Text> },
              { key: 'three', label: 'Aba 3', content: <Text>Conteúdo da aba 3</Text> },
            ]}
            activeKey={tab}
            onChange={setTab}
          />
        </View>
        <Spacing />

        <Text fontWeight="bold">SourceSwitch</Text>
        <Spacing size="sm" />
        <SourceSwitch />
      </ScrollView>
    </Container>
  );
}
