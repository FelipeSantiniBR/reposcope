export class RateLimitError extends Error {
  constructor() {
    super('Limite de requisições excedido. Tente novamente em alguns minutos.');
    this.name = 'RateLimitError';
  }
}

export class NetworkError extends Error {
  constructor() {
    super('Sem conexão. Verifique sua internet e tente novamente.');
    this.name = 'NetworkError';
  }
}
