import { create } from 'axios';

export const gitlabHttp = create({
  baseURL: 'https://gitlab.com/api/v4',
  headers: process.env.EXPO_PUBLIC_GITLAB_TOKEN
    ? { 'PRIVATE-TOKEN': process.env.EXPO_PUBLIC_GITLAB_TOKEN }
    : {},
});
