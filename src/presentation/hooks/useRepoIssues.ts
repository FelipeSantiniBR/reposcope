import { useInfiniteQuery } from '@tanstack/react-query';
import { getRepoIssues } from '../../application/usecases/getRepoIssues';
import { useDataSource, useIssueSource } from '../../infrastructure/di/DataSourceProvider';

export function useRepoIssues(repoId: string) {
  const issueSource = useIssueSource();
  const { sourceName } = useDataSource();
  //usamos useInfiniteQuery por se tratar de uma lista paginada com infinite scroll
  return useInfiniteQuery({
    queryKey: ['issues', sourceName, repoId],
    queryFn: ({ pageParam }) => getRepoIssues(issueSource, repoId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!repoId,
    staleTime: 100 * 60 * 2, //2 minutos
  });
}
