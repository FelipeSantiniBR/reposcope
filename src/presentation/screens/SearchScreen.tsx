import { useState } from 'react';
import { useSearchRepos } from '../hooks/useSearchRepos';
import { ActivityIndicator, FlatList, Text, TextInput, View } from 'react-native';

export function SearchScreen() {
  const [query, setQuery] = useState('');
  const { data, fetchNextPage, hasNextPage, isLoading, isError, refetch } = useSearchRepos(query);

  const repos = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <View style={{ flex: 1, paddingTop: 60, paddingHorizontal: 16 }}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar repositórios (ex: react native)"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          marginBottom: 12,
        }}
      />

      {isLoading && <ActivityIndicator />}
      {isError && <Text>Ocorreu um erro ao buscar. Tente novamente.</Text>}
      {!isLoading && !isError && query.length > 0 && repos.length === 0 && (
        <Text>Nenhum repositório encontrado.</Text>
      )}

      <FlatList
        data={repos}
        keyExtractor={(item) => item.id}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        onRefresh={refetch}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
            <Text style={{ fontWeight: 'bold' }}>{item.fullName}</Text>
            <Text numberOfLines={2}>{item.description}</Text>
            <Text>
              ⭐ {item.stars} · {item.language}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
