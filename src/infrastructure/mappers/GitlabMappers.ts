import { Issue } from '../../domain/entities/Issue';
import { Repository } from '../../domain/entities/Repository';

export function toRepositoryFromGitLab(raw: any): Repository {
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

export function toIssueFromGitLab(raw: any): Issue {
  return {
    id: String(raw.id),
    title: raw.title,
    author: raw.author?.username ?? 'desconhecido',
    labels: raw.labels,
    createdAt: raw.created_at,
  };
}
