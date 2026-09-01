import { RepositorySource } from '../../domain/repositories/RepositorySource';

export function searchRepos(source: RepositorySource, query: string, page: number) {
  return source.search(query, page);
}
