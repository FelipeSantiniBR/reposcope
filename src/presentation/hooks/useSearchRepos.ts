import { useInfiniteQuery } from '@tanstack/react-query';
import { searchRepos } from '../../application/usecases/searchRepos';
import { useDataSource, useRepositorySource } from '../../infrastructure/di/DataSourceProvider';

export function useSearchRepos(query: string) {
  const source = useRepositorySource();
  const { sourceName } = useDataSource();
  //usamos useInfiniteQuery por se tratar de uma lista paginada com infinite scroll
  return useInfiniteQuery({
    queryKey: ['repos', sourceName, query],
    queryFn: ({ pageParam }) => searchRepos(source, query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: query.length > 0,
    staleTime: 100 * 60 * 2, //2 minutos
  });
}
