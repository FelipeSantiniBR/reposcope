import { Issue } from '../../domain/entities/Issue';
import { Repository } from '../../domain/entities/Repository';

interface GitLabProjectDto {
  id: number;
  name: string;
  path_with_namespace: string;
  namespace?: { name: string };
  avatar_url?: string | null;
  description: string | null;
  star_count: number;
  forks_count: number;
}

interface GitLabIssueDto {
  id: number;
  title: string;
  author?: { username: string };
  labels: string[];
  created_at: string;
}

export function toRepositoryFromGitLab(raw: GitLabProjectDto): Repository {
  return {
    id: String(raw.id),
    name: raw.name,
    fullName: raw.path_with_namespace,
    owner: {
      name: raw.namespace?.name ?? '',
      avatarUrl: raw.avatar_url ?? '',
    },
    description: raw.description,
    stars: raw.star_count,
    forks: raw.forks_count,
    watchers: 0,
    language: null,
  };
}

export function toIssueFromGitLab(raw: GitLabIssueDto): Issue {
  return {
    id: String(raw.id),
    title: raw.title,
    author: raw.author?.username ?? 'desconhecido',
    labels: raw.labels,
    createdAt: raw.created_at,
  };
}
