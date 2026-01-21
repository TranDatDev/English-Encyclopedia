import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useDebounce } from "use-debounce";

import { useSuggestions } from "@/shared/hooks/useSuggestions";

export default function DictionarySearchBox() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 700);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const navigate = useNavigate();
  const { data, isLoading } = useSuggestions(debouncedQuery);

  const inlineSuggestion = useMemo(() => {
    if (!isFocused || !query || !data?.length) return "";

    const lowerQuery = query.toLowerCase();
    const candidates = data.filter((item) =>
      item.word.toLowerCase().startsWith(lowerQuery),
    );

    if (candidates.length === 0) return "";

    if (
      candidates[0].word.toLowerCase() === lowerQuery &&
      candidates.length > 1
    ) {
      return candidates[1].word;
    }

    if (candidates[0].word.toLowerCase() !== lowerQuery) {
      return candidates[0].word;
    }

    return "";
  }, [isFocused, query, data]);

  const handleSearch = () => {
    const term =
      highlightedIndex !== -1 && data?.length && highlightedIndex < data.length
        ? data[highlightedIndex].word
        : query.trim();
    if (term) {
      navigate(`/dictionary/${encodeURIComponent(term.toLowerCase())}`);
      setHighlightedIndex(-1);
    }
  };
  const handleSelect = (word: string) => {
    setQuery(word);
    navigate(`/dictionary/${encodeURIComponent(word.toLowerCase())}`);
    setIsFocused(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!data?.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    } else if (e.key === "Tab" && inlineSuggestion) {
      e.preventDefault();
      setQuery(inlineSuggestion);
      setHighlightedIndex(-1);
    } else {
      setHighlightedIndex(-1);
    }
  };

  // Reset highlight khi query thay đổi
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [debouncedQuery]);

  return (
    <div className="relative w-full">
      <div className="flex">
        <div className="relative flex-grow">
          <input
            type="text"
            value={inlineSuggestion}
            disabled
            className="pointer-events-none absolute inset-0 rounded-l-xl border border-transparent bg-transparent px-3 py-2 text-gray-400 select-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            placeholder="Tra cứu từ điển"
            className="relative z-10 w-full rounded-l-xl border border-gray-300 bg-transparent px-3 py-2 placeholder:text-gray-800 focus:ring focus:ring-blue-400 focus:outline-none"
          />

          {/* Dropdown suggestions */}
          {isFocused && !isLoading && data && data.length > 0 && (
            <ul className="absolute right-0 left-0 z-20 mt-1 max-h-60 overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg">
              {data.map((item, i) => (
                <li
                  key={i}
                  onMouseDown={() => handleSelect(item.word)}
                  className={`cursor-pointer px-4 py-2 ${
                    i === highlightedIndex
                      ? "bg-blue-100 font-medium"
                      : "hover:bg-blue-50"
                  }`}
                >
                  {item.word}
                </li>
              ))}
            </ul>
          )}

          {/* Loading state */}
          {isLoading && isFocused && (
            <div className="absolute right-0 left-0 mt-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-500 shadow-sm">
              Đang tải gợi ý...
            </div>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="focus:ring-black-400 hover:bg-black-800 dark:hover:bg-white-800 cursor-pointer rounded-r-xl bg-black px-4 py-2 text-white focus:ring focus:outline-none dark:bg-white"
        >
          <Icon icon="mdi:magnify" className="h-5 w-5 dark:invert-100" />
        </button>
      </div>
    </div>
  );
}
