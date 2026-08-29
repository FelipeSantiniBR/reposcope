export interface Owner {
  name: string;
  avatarUrl: string;
}

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  owner: Owner;
  description: string | null;
  stars: number;
  forks: number;
  watchers: number;
  language: string | null;
}
