# reposcope

Busca de repositórios com troca de fonte em runtime entre GitHub e GitLab. Expo + TypeScript + Clean Architecture.

## Instalação e execução

```bash
git clone https://github.com/FelipeSantiniBR/reposcope.git
cd reposcope
npm install
cp .env.example .env   # opcional: tokens do GitHub/GitLab para aumentar o rate limit
npx expo start
```

Escaneie o QR code com o Expo Go, ou pressione `i`/`a` para simulador/emulador.

## Arquitetura

```
src/
├── domain/           # entidades e contratos — zero dependência externa
├── application/       # use cases — orquestram o domínio
├── infrastructure/    # implementações (GitHub, GitLab, DI) — dependem do domínio
└── presentation/       # telas, componentes, hooks — consomem via injeção
```

**Por quê Clean Architecture:** o requisito central do teste (fontes de dados intercambiáveis em runtime) é, na prática, um problema de inversão de dependência. **Trade-off:** mais arquivos/indireção do que uma implementação direta — aceitei isso conscientemente em troca de testabilidade e desacoplamento real entre GitHub/GitLab.

## Troca de fonte sem impactar a UI

1. `domain/entities/` define um formato único de `Repository`/`Issue`, baseado nos requisitos de tela — não no formato de nenhuma API.
2. `domain/repositories/` define os contratos (`RepositorySource`, `IssueSource`).
3. `infrastructure/datasources/{github,gitlab}/` implementam esses contratos, cada um com seu mapper traduzindo o formato específico da API para a entidade única.
4. `infrastructure/di/DataSourceProvider.tsx` é o **único ponto do projeto** que decide qual fonte está ativa (lookup por Context, sem `if`/`switch` espalhado).
5. Os hooks incluem a fonte ativa no `queryKey` do React Query — trocar de fonte já refaz a busca automaticamente.

## Testes

- `domain/domain.test.ts`: garante via análise do código-fonte que `domain/` não importa nenhuma lib externa (ver "Uso de IA").
- `application/usecases/*.test.ts`: cobrem os três use cases com fontes fake, sem depender de rede.
- `presentation/components/{Button,Badge}.test.tsx`: testes de componente com Jest + React Native Testing Library (press, disabled, loading, tones).

## Decisões notáveis

- **`id` vs `fullName`:** GitHub exige `owner/repo` no endpoint de detalhes; GitLab aceita `id` numérico. O identificador usado varia por fonte internamente, sem vazar pra interface pública dos use cases.
- **Campos ausentes no GitLab:** `watchers` e `language` não existem/exigem chamada extra no endpoint `/projects`; retorno `0`/`null` nesses casos.
- **Filtro de PRs não implementado:** `/repos/{owner}/{repo}/issues` do GitHub também retorna pull requests; não filtrei por tempo, ver "o que faria diferente".
- **Seletor de fonte só na Busca:** replicar em Detalhes/Issues exigiria decidir o que fazer com um repositório que não existe na outra fonte — optei por manter só na tela de origem, pois não entendi se era pra ficar em todo o fluxo o seletor.

## Uso de IA

Usei Claude como apoio durante o desenvolvimento, com revisão e adaptação constante.

**Gerado/assistido:**

- Um resumo e um roadmap a partir do documento do teste técnico, para organizar a ordem de implementação (domínio → infraestrutura → aplicação → apresentação → design system).
- Os testes de domain/ (verificação estrutural de isolamento) e dos use cases em application/usecases/.
- Os testes de componente de Button/Badge com React Native Testing Library.
- A criação de branches e as mensagens de commit, a partir das alterações que eu já tinha feito em cada branch.
- Componente Tabs foi criado a partir de prompt pedindo o que era necessário.
- Review final de todo o projeto, pedindo para verificar algum gap referente aos requisitos.

**Prompt usado (exemplos):**

- "Resuma esse documento de teste técnico e monte um roadmap de implementação."
- "Como posso garantir automaticamente, via teste, que meus arquivos de domínio não importam nenhuma lib externa?"
- "Gere os testes para esses use cases, usando uma fonte de dados fake."

**O que modifiquei, revisei ou rejeitei:**

- A IA sugeriu os use cases como classes com constructor (injeção de dependência via `new SearchReposUseCase(source)`); rejeitei e troquei por funções puras (`searchRepos(source, query, page)`), que já resolvem a inversão de dependência sem o boilerplate de classe.

## O que eu faria diferente com mais tempo

- Filtro de Pull Requests nas issues do GitHub.
- Buscar a linguagem principal do GitLab via `/projects/:id/languages`.
- Pensaria em alguma forma de manter o seletor em todo o fluxo, mas com uma tratativa melhor e mais robusta quando estivesse por exemplo na Issue de um repo no GitHub e mudasse pra GitLab e não existisse esse repo.
- Criaria outros componentes mais robustos, para não precisar usar View principalmente, e com os styles também criados com valores.
- Criar um arquivo de translate para o projeto.
