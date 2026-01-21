import type { DictionaryEntry } from "@/shared/types/dictionary.type";

import { api } from "./api";

export async function fetchDictionary(
  word: string,
): Promise<DictionaryEntry[]> {
  const res = await api.get(word);
  return res.json<DictionaryEntry[]>();
}
