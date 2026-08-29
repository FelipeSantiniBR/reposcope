# reposcope

## Uso de IA

### O que foi gerado ou assistido por IA

- Teste de verificação estrutural do domínio (`domain.test.ts`), que garante que `src/domain/` não importa nenhuma lib externa.

### Prompt/instrução utilizada

- "Como posso garantir automaticamente, via teste, que meus arquivos de domínio não importam nenhuma lib externa?"

### O que modifiquei/avaliei

- Entendi que esse teste verifica estrutura do código-fonte, não comportamento — diferente dos testes de use case, que são a exigência mínima do enunciado.
- Mantive o teste pontual e documentado, sem expandir para ferramentas mais robustas (ex. `dependency-cruiser`), para não gastar tempo além do escopo pedido.
- Validei manualmente que o teste falha ao importar `axios` num arquivo de `domain/`, antes de reverter a alteração.

### O que eu faria diferente com mais tempo

- Extrairia essa verificação para uma regra de lint em vez de um teste Jest dedicado.
