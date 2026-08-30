import { useQuery } from '@tanstack/react-query';
import { getRepoDetails } from '../../application/usecases/getRepoDetails';
import { useDataSource, useRepositorySource } from '../../infrastructure/di/DataSourceProvider';

export function useRepoDetails(id: string) {
  const source = useRepositorySource();
  const { sourceName } = useDataSource();
  //como busca apenas um repo, sem paginação, usamos useQuery que resolve
  return useQuery({
    queryKey: ['repo', sourceName, id],
    queryFn: () => getRepoDetails(source, id),
    enabled: !!id,
  });
}
