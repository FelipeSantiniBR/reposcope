import axios from 'axios';
import { NetworkError, RateLimitError } from '../../../domain/errors/DomainErrors';
import { RepositorySource } from '../../../domain/repositories/RepositorySource';
import { toRepositoryFromGitLab } from '../../mappers/GitlabMappers';
import { gitlabHttp } from './gitlabHttp';
import { handleGitLabError } from './gitlabErrorHandler';

export const gitlabRepositorySource: RepositorySource = {
  async search(query, page) {
    try {
      const response = await gitlabHttp.get('/projects', {
        params: { search: query, order_by: 'star_count', sort: 'desc', page, per_page: 20 },
      });
      const totalPages = Number(response.headers['x-total-pages']);
      return {
        items: response.data.map(toRepositoryFromGitLab),
        nextPage: page < totalPages ? page + 1 : null,
      };
    } catch (err) {
      handleGitLabError(err);
    }
  },

  async getById(id) {
    try {
      const { data } = await gitlabHttp.get(`/projects/${encodeURIComponent(id)}`);
      return toRepositoryFromGitLab(data);
    } catch (err) {
      handleGitLabError(err);
    }
  },
};
