import { IssueSource } from '../../../domain/repositories/IssueSource';
import { toIssueFromGitLab } from '../../mappers/GitlabMappers';
import { handleGitLabError } from './gitlabErrorHandler';
import { gitlabHttp } from './gitlabHttp';

export const gitlabIssueSource: IssueSource = {
  async getIssues(repoId, page) {
    try {
      const response = await gitlabHttp.get(`/projects/${encodeURIComponent(repoId)}/issues`, {
        params: { state: 'opened', page, per_page: 20 },
      });
      const totalPages = Number(response.headers['x-total-pages']);
      return {
        items: response.data.map(toIssueFromGitLab),
        nextPage: page < totalPages ? page + 1 : null,
      };
    } catch (err) {
      handleGitLabError(err);
    }
  },
};
