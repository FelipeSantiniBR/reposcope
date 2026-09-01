import { Issue } from '../../domain/entities/Issue';
import { Repository } from '../../domain/entities/Repository';

interface GitHubRepositoryDto {
  id: number;
  name: string;
  full_name: string;
  owner: { login: string; avatar_url: string };
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
}

interface GitHubIssueDto {
  id: number;
  title: string;
  user: { login: string };
  labels: { name: string }[];
  created_at: string;
}

export function toRepositoryFromGitHub(raw: GitHubRepositoryDto): Repository {
  return {
    id: String(raw.id),
    name: raw.name,
    fullName: raw.full_name,
    owner: {
      name: raw.owner.login,
      avatarUrl: raw.owner.avatar_url,
    },
    description: raw.description,
    stars: raw.stargazers_count,
    forks: raw.forks_count,
    watchers: raw.watchers_count,
    language: raw.language,
  };
}

export function toIssueFromGitHub(raw: GitHubIssueDto): Issue {
  return {
    id: String(raw.id),
    title: raw.title,
    author: raw.user.login,
    labels: raw.labels.map((label) => label.name),
    createdAt: raw.created_at,
  };
}
