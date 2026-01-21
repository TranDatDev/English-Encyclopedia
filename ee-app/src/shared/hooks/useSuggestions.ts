// hooks/useSuggestions.ts
import { useQuery } from "@tanstack/react-query";

import { getSuggestions } from "@/shared/services/api";

export const useSuggestions = (query: string) => {
  return useQuery({
    queryKey: ["suggestions", query],
    queryFn: async () => {
      const data = await getSuggestions(query);

      const singleWords = data.filter((item) => !item.word.includes(" "));
      const sorted = singleWords.sort((a, b) => {
        if (a.word.length === b.word.length) return b.score - a.score;
        return a.word.length - b.word.length;
      });

      return sorted.slice(0, 5);
    },
    enabled: !!query.trim(),
    staleTime: 1000 * 60 * 5,
  });
};
