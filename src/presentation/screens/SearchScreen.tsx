import { useState } from 'react';
import { useSearchRepos } from '../hooks/useSearchRepos';
import { Text } from '../components/Text';
import { ActivityIndicator, FlatList } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { SourceSwitch } from '../components/SourceSwitch';
import { Spacing } from '../components/Spacing';
import { Container } from '../components/Container';
import { Input } from '../components/Input';
import { RepositoryCard } from '../components/RepositoryCard';
import { NetworkError, RateLimitError } from '../../domain/errors/DomainErrors';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export function SearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const { data, fetchNextPage, hasNextPage, isLoading, error, refetch } = useSearchRepos(query);

  const repos = data?.pages.flatMap((page) => page.items) ?? [];
  const hasError = Boolean(error);

  return (
    <Container>
      <Text fontSize="xxl" fontWeight="600">
        Buscar repositórios
      </Text>
      <Spacing />
      <SourceSwitch />
      <Spacing />
      <Input
        placeholder="Buscar..."
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      <Spacing />

      {isLoading && <ActivityIndicator />}

      {error instanceof RateLimitError && <Text>{error.message}</Text>}
      {error instanceof NetworkError && <Text>{error.message}</Text>}
      {error && !(error instanceof RateLimitError) && !(error instanceof NetworkError) && (
        <Text>Ocorreu um erro inesperado.</Text>
      )}

      {!isLoading && !hasError && query.length > 0 && repos.length === 0 && (
        <Text>Nenhum repositório encontrado.</Text>
      )}

      <FlatList
        data={repos}
        keyExtractor={(item) => item.id}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        onRefresh={refetch}
        refreshing={isLoading}
        ItemSeparatorComponent={() => <Spacing size="sm" />}
        renderItem={({ item }) => (
          <RepositoryCard
            repository={item}
            onPress={() => navigation.navigate('Repository', { repositoryId: item.fullName })}
          />
        )}
      />
    </Container>
  );
}
