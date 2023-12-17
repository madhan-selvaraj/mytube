import { useQuery } from "@tanstack/react-query";
import { Video } from "./trending";

export type SearchSuggestion = {
  query: string;
  suggestions: string[];
};

/**
 * Get full metadata of the given video ID
 * @param q Search query
 * @returns {SearchSuggestion} Search suggestions
 */
export const useSearchSuggestions = (q: string) =>
  useQuery<SearchSuggestion>({
    queryKey: ["/api/v1/search/suggestions", { q }],
    enabled: q.length >= 2,
  });

/**
 * Get full metadata of the given video ID
 * @param q Search query
 * @returns {Video[]} Search suggestions
 */
export const useSearch = (q: string) =>
  useQuery<Video[]>({
    queryKey: ["/api/v1/search", { q, page: 0 }],
  });
