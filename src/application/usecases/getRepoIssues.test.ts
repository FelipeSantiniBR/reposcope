import { IssueSource } from '../../domain/repositories/IssueSource';
import { PaginatedResult } from '../../domain/repositories/RepositorySource';
import { Issue } from '../../domain/entities/Issue';
import { getRepoIssues } from './getRepoIssues';

describe('getRepoIssues', () => {
  it('delegates to source.getIssues with the given repoId and page and returns its result', async () => {
    const page: PaginatedResult<Issue> = {
      items: [
        {
          id: '1',
          title: 'Bug found',
          labels: ['bug'],
          author: 'felipe',
          createdAt: '2026-08-30T00:00:00Z',
        },
      ],
      nextPage: 2,
    };
    const source: IssueSource = {
      getIssues: jest.fn().mockResolvedValue(page),
    };

    const result = await getRepoIssues(source, 'owner/repo', 1);

    expect(source.getIssues).toHaveBeenCalledWith('owner/repo', 1);
    expect(result).toBe(page);
  });
});
