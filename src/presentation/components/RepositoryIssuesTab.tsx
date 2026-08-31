import { ActivityIndicator, FlatList, View } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { NetworkError, RateLimitError } from '../../domain/errors/DomainErrors';
import { useRepoIssues } from '../hooks/useRepoIssues';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';
import { Card } from './Card';
import { Badge } from './Badge';
import { Spacing } from './Spacing';

interface Props {
  repositoryId: string;
}

export function RepositoryIssuesTab({ repositoryId }: Props) {
  const { spacing } = useTheme();
  const { data, fetchNextPage, hasNextPage, isLoading, error, refetch } =
    useRepoIssues(repositoryId);
  const issues = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator />}

      {error instanceof RateLimitError && <Text>{error.message}</Text>}
      {error instanceof NetworkError && <Text>{error.message}</Text>}
      {error && !(error instanceof RateLimitError) && !(error instanceof NetworkError) && (
        <Text>Ocorreu um erro ao carregar as issues.</Text>
      )}

      {!isLoading && !error && issues.length === 0 && <Text>Nenhuma issue encontrada.</Text>}

      <FlatList
        data={issues}
        keyExtractor={(item) => item.id}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        onRefresh={refetch}
        refreshing={isLoading}
        ItemSeparatorComponent={() => <Spacing size="sm" />}
        renderItem={({ item }) => (
          <Card>
            <Text fontWeight="bold">{item.title}</Text>
            <Spacing size="xs" />
            <Text fontSize="sm" variant="muted">
              {item.author} ·{' '}
              {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: ptBR })}
            </Text>
            {item.labels.length > 0 && (
              <>
                <Spacing size="xs" />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
                  {item.labels.map((label) => (
                    <Badge key={label} label={label} />
                  ))}
                </View>
              </>
            )}
          </Card>
        )}
      />
    </View>
  );
}
