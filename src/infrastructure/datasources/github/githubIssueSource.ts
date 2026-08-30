// src/infrastructure/datasources/github/githubIssueSource.ts

import { IssueSource } from "../../../domain/repositories/IssueSource";
import { toIssueFromGitHub } from "../../mappers/GithubMappers";
import { githubHttp } from "./githubHttp";

export const githubIssueSource: IssueSource = {
  async getIssues(repoId, page) {
    const { data } = await githubHttp.get(`/repos/${repoId}/issues`, {
      params: { state: 'open', page, per_page: 20 },
    });

    return {
      items: data.map(toIssueFromGitHub),
      nextPage: data.length === 20 ? page + 1 : null,
    };
  },
};