import { RepositorySource } from '../../domain/repositories/RepositorySource';

export function getRepoDetails(source: RepositorySource, id: string) {
  return source.getById(id);
}
