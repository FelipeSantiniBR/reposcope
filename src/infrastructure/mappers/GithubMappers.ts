import { Repository } from "../../domain/entities/Repository";

export function toRepositoryFromGitHub(raw: any): Repository {
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