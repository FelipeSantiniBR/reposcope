import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useRepoDetails } from '../hooks/useRepoDetails';
import { Container } from '../components/Container';
import { Text } from '../components/Text';
import { Avatar } from '../components/Avatar';
import { Spacing } from '../components/Spacing';
import { Tabs } from '../components/Tabs';
import { RepositoryDetailsTab } from '../components/RepositoryDetailsTab';
import { RepositoryIssuesTab } from '../components/RepositoryIssuesTab';

type Props = NativeStackScreenProps<RootStackParamList, 'Repository'>;
type Tab = 'details' | 'issues';

export function RepositoryScreen({ route }: Props) {
  const { repositoryId } = route.params;
  const [tab, setTab] = useState<Tab>('details');

  const { data: repository, isLoading, isError } = useRepoDetails(repositoryId);

  return (
    <Container>
      {isLoading && <ActivityIndicator />}
      {isError && <Text>Ocorreu um erro ao carregar o repositório.</Text>}

      {repository && (
        <View style={{ flex: 1 }}>
          <Text fontSize="xl" fontWeight="700">
            {repository.fullName}
          </Text>
          <Spacing size="sm" />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar uri={repository.owner.avatarUrl} name={repository.owner.name} />
            <Spacing direction="horizontal" size="sm" />
            <Text variant="muted">{repository.owner.name}</Text>
          </View>
          <Spacing />

          {repository.description && <Text>{repository.description}</Text>}
          <Spacing />

          <Tabs
            activeKey={tab}
            onChange={setTab}
            items={[
              {
                key: 'details',
                label: 'Detalhes',
                content: <RepositoryDetailsTab repository={repository} />,
              },
              {
                key: 'issues',
                label: 'Issues',
                content: <RepositoryIssuesTab repositoryId={repositoryId} />,
              },
            ]}
          />
        </View>
      )}
    </Container>
  );
}
