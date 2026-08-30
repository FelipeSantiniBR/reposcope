import { useQuery } from "@tanstack/react-query";
import { getRepoDetails } from "../../application/usecases/getRepoDetails";
import { githubRepositorySource } from "../../infrastructure/datasources/github/githubRepositorySource";

export function useRepoDetails(id: string) {
    //como busca apenas um repo, sem paginação, usamos useQuery que resolve
  return useQuery({
    queryKey: ['repo', 'github', id],
    queryFn: () => getRepoDetails(githubRepositorySource, id),
    enabled: !!id,
  });
}