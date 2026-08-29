import { Repository } from '../entities/Repository';

export interface PaginatedResult<T> {
  items: T[];
  nextPage: number | null;
}

export interface RepositorySource {
  search(query: string, page: number): Promise<PaginatedResult<Repository>>;
  getById(id: string): Promise<Repository>;
}
