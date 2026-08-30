import axios from 'axios';

export const githubHttp = axios.create({
  baseURL: 'https://api.github.com',
  headers: process.env.EXPO_PUBLIC_GITHUB_TOKEN
    ? { Authorization: `token ${process.env.EXPO_PUBLIC_GITHUB_TOKEN}` }
    : {},
});
