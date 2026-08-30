import { useInfiniteQuery } from "@tanstack/react-query";
import { searchRepos } from "../../application/usecases/searchRepos";
import { githubRepositorySource } from "../../infrastructure/datasources/github/githubRepositorySource";

export function useSearchRepos(query: string) {
    //usamos useInfiniteQuery por se tratar de uma lista paginada com infinite scroll
    return useInfiniteQuery({
        queryKey: ['repos', 'github', query],
        queryFn: ({ pageParam }) => searchRepos(githubRepositorySource, query, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        enabled: query.length > 0,
    })
}