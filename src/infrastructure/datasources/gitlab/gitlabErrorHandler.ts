import { isAxiosError } from 'axios';
import { NetworkError, RateLimitError } from '../../../domain/errors/DomainErrors';

export function handleGitLabError(err: unknown): never {
  if (isAxiosError(err)) {
    if (err.response?.status === 429) {
      throw new RateLimitError();
    }
    if (!err.response) {
      throw new NetworkError();
    }
  }
  throw err;
}
