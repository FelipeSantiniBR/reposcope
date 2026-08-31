import { useState } from 'react';
import { useSearchRepos } from '../hooks/useSearchRepos';
import { Text } from '../components/Text';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';
import { Sun, Moon, Palette } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useTheme } from '../theme/ThemeProvider';
import { SourceSwitch } from '../components/SourceSwitch';
import { Spacing } from '../components/Spacing';
import { Container } from '../components/Container';
import { Input } from '../components/Input';
import { RepositoryCard } from '../components/RepositoryCard';
import { NetworkError, RateLimitError } from '../../domain/errors/DomainErrors';
import { ErrorMessage } from '../components/ErrorMessage';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export function SearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const { data, fetchNextPage, hasNextPage, isLoading, error, refetch } = useSearchRepos(query);
  const { mode, toggleMode, colors, spacing } = useTheme();

  const repos = data?.pages.flatMap((page) => page.items) ?? [];
  const hasError = Boolean(error);

  return (
    <Container>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text fontSize="xxl" fontWeight="600">
          Buscar repositórios
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <Pressable onPress={() => navigation.navigate('Showcase')} hitSlop={8}>
            <Palette color={colors.text} size={22} />
          </Pressable>
          <Pressable onPress={toggleMode} hitSlop={8}>
            {mode === 'dark' ? (
              <Sun color={colors.text} size={22} />
            ) : (
              <Moon color={colors.text} size={22} />
            )}
          </Pressable>
        </View>
      </View>
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

      <ErrorMessage error={error} />

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
