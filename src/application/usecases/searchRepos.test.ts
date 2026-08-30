import { RepositorySource, PaginatedResult } from '../../domain/repositories/RepositorySource';
import { Repository } from '../../domain/entities/Repository';
import { searchRepos } from './searchRepos';

describe('searchRepos', () => {
  it('delegates to source.search with the given query and page and returns its result', async () => {
    const page: PaginatedResult<Repository> = {
      items: [
        {
          id: '1',
          name: 'reposcope',
          fullName: 'felipe/reposcope',
          owner: { name: 'felipe', avatarUrl: 'https://example.com/avatar.png' },
          description: null,
          stars: 10,
          forks: 2,
          watchers: 5,
          language: 'TypeScript',
        },
      ],
      nextPage: null,
    };
    const source: RepositorySource = {
      search: jest.fn().mockResolvedValue(page),
      getById: jest.fn(),
    };

    const result = await searchRepos(source, 'react-native', 1);

    expect(source.search).toHaveBeenCalledWith('react-native', 1);
    expect(result).toBe(page);
  });
});
