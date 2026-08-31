import { ScrollView, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { Spacing } from '../components/Spacing';

export function ShowcaseScreen() {
  const { spacing } = useTheme();

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text fontSize="xl" fontWeight="700">
          Design System
        </Text>
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
      </ScrollView>
    </Container>
  );
}
