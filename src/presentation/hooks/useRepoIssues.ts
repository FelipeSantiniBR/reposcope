import { useInfiniteQuery } from "@tanstack/react-query";
import { getRepoIssues } from "../../application/usecases/getRepoIssues";
import { githubIssueSource } from "../../infrastructure/datasources/github/githubIssueSource";

export function useRepoIssues(repoId: string) {
    //usamos useInfiniteQuery por se tratar de uma lista paginada com infinite scroll
  return useInfiniteQuery({
    queryKey: ['issues', 'github', repoId],
    queryFn: ({ pageParam }) => getRepoIssues(githubIssueSource, repoId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!repoId,
  });
}