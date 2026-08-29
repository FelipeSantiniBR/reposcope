import { Issue } from '../entities/Issue';
import { PaginatedResult } from './RepositorySource';

export interface IssueSource {
  getIssues(repoId: string, page: number): Promise<PaginatedResult<Issue>>;
}
