import { RepositorySource } from '../../../domain/repositories/RepositorySource';
import { toRepositoryFromGitHub } from '../../mappers/GithubMappers';
import { githubHttp } from './githubHttp';

export const githubRepositorySource: RepositorySource = {
  async search(query, page) {
    const { data } = await githubHttp.get('/search/repositories', {
      params: { q: query, sort: 'stars', order: 'desc', page, per_page: 20 },
    });
    return {
      items: data.items.map(toRepositoryFromGitHub),
      nextPage: data.items.length === 20 ? page + 1 : null,
    };
  },

  async getById(id) {
    const { data } = await githubHttp.get(`/repos/${id}`);
    return toRepositoryFromGitHub(data);
  },
};
