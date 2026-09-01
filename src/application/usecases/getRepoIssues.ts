import { IssueSource } from '../../domain/repositories/IssueSource';

export function getRepoIssues(source: IssueSource, repoId: string, page: number) {
  return source.getIssues(repoId, page);
}
