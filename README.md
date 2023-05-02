# Fluxo Ágil

**Número da Lista**: 09<br>
**Conteúdo da Disciplina**: Grafos 1<br>

## Alunos
|Matrícula | Aluno |
| -- | -- |
| 17/0111059  |  Matheus Fonseca Sousa |
| 17/0105342  |  Irwin Schimitt |

Esse é um projeto [Next.js](https://nextjs.org/) inicializado com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Sobre 

O FluxoÁgil é um projeto que recebe do usuário as disciplinas já cursadas no curso de engenharia de software na UnB, e retorna a ordenação topológica das disciplinas pendentes de serem cursadas. Ou seja, mostra ao usuário as disciplinas que ele pode cursar no momento, e as disciplinas que ele está mais distante de poder pegar.

## Screenshots


![Screen Shot 2023-05-01 at 22 16 21](https://user-images.githubusercontent.com/44441530/235558943-34ff6df2-0f6a-4f9d-b029-d8787c87b4df.png)


## Instalação
### Começando

É necessário ter o `npm` e o `yarn` instalado na máquina.

Primeiro, instale as dependências:

```bash
npm install
# ou
yarn install
```

Depois execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) com o seu navegador para ver o resultado.

Você pode começar a editar a página ao modificar `pages/index.tsx`. A página atualiza em tempo real de acordo com o seu trabalho no arquivo.

## Uso 
O FluxoÁgil é um projeto para auxiliar os estudantes do curso de Engenharia de Software na UnB a priorizar as disciplinas que devem ser cursadas com base nas disciplinas já cursadas pelo aluno. 

Para utilizar o projeto, siga as instruções:

1. Selecione o currículo em que está matriculado. Na Engenharia de Software da UnB, existem dois currículos ativos atualmente.

2. As disciplinas pendentes de serem cursadas serão exibidas em ordem de prioridade. Para que a recomendação seja mais precisa, é possível selecionar as disciplinas já cursadas. Dessa forma, apenas as disciplinas que ainda não foram cursadas serão exibidas.

Alguns detalhes sobre a aplicação:

- A lista de prioridade é gerada com base nos algoritmos de ordenação topológica e DFS;
- Para tornar a prioridade mais fiel ao fluxo do curso, a ordenação topológica inicia iterando pelas disciplinas recomendadas nos primeiros períodos de curso.
