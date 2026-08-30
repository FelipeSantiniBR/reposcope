import { RepositorySource } from '../../domain/repositories/RepositorySource';
import { Repository } from '../../domain/entities/Repository';
import { getRepoDetails } from './getRepoDetails';

describe('getRepoDetails', () => {
  it('delegates to source.getById with the given id and returns its result', async () => {
    const repo: Repository = {
      id: '1',
      name: 'reposcope',
      fullName: 'felipe/reposcope',
      owner: { name: 'felipe', avatarUrl: 'https://example.com/avatar.png' },
      description: null,
      stars: 10,
      forks: 2,
      watchers: 5,
      language: 'TypeScript',
    };
    const source: RepositorySource = {
      search: jest.fn(),
      getById: jest.fn().mockResolvedValue(repo),
    };

    const result = await getRepoDetails(source, '1');

    expect(source.getById).toHaveBeenCalledWith('1');
    expect(result).toBe(repo);
  });
});
