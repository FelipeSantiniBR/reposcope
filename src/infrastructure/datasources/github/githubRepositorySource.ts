import axios from 'axios';
import { RepositorySource } from '../../../domain/repositories/RepositorySource';
import { toRepositoryFromGitHub } from '../../mappers/GithubMappers';
import { githubHttp } from './githubHttp';
import { NetworkError, RateLimitError } from '../../../domain/errors/DomainErrors';
import { handleGitHubError } from './githubErrorHandler';

export const githubRepositorySource: RepositorySource = {
  async search(query, page) {
    try {
      const { data } = await githubHttp.get('/search/repositories', {
        params: { q: query, sort: 'stars', order: 'desc', page, per_page: 20 },
      });
      return {
        items: data.items.map(toRepositoryFromGitHub),
        nextPage: data.items.length === 20 ? page + 1 : null,
      };
    } catch (err) {
      handleGitHubError(err);
    }
  },

  async getById(id) {
    try {
      const { data } = await githubHttp.get(`/repos/${id}`);
      return toRepositoryFromGitHub(data);
    } catch (err) {
      handleGitHubError(err);
    }
  },
};
