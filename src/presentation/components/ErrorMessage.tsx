import { NetworkError, RateLimitError } from '../../domain/errors/DomainErrors';
import { Text } from './Text';

interface Props {
  error: unknown;
  fallbackMessage?: string;
}

export function ErrorMessage({ error, fallbackMessage = 'Ocorreu um erro inesperado.' }: Props) {
  if (!error) return null;

  if (error instanceof RateLimitError || error instanceof NetworkError) {
    return <Text>{error.message}</Text>;
  }

  return <Text>{fallbackMessage}</Text>;
}
