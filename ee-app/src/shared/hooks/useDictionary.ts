import { useQuery } from "@tanstack/react-query";

import { fetchDictionary } from "@/shared/services/dictionary";
import type { DictionaryEntry } from "@/shared/types/dictionary.type";

export function useDictionary(word: string) {
  return useQuery<DictionaryEntry[], Error>({
    queryKey: ["dictionary", word],
    queryFn: () => fetchDictionary(word),
    enabled: !!word,
    staleTime: 1000 * 60 * 5,
  });
}
