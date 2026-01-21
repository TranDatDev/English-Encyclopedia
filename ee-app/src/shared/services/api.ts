import ky from "ky";

export const api = ky.create({
  prefixUrl: "https://api.dictionaryapi.dev/api/v2/entries/en",
  timeout: 10000,
  retry: 1,
});

export interface Suggestion {
  word: string;
  score: number;
}

export const getSuggestions = async (query: string): Promise<Suggestion[]> => {
  if (!query.trim()) return [];
  const data = await ky
    .get("https://api.datamuse.com/sug", { searchParams: { s: query } })
    .json<Suggestion[]>();
  return data;
};
