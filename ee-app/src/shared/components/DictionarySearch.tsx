import { useState } from "react";
import { useDebounce } from "use-debounce";

import { useDictionary } from "@/shared/hooks/useDictionary";
import type { DictionaryEntry } from "@/shared/types/dictionary.type";

interface DictionarySearchProps {
  className?: string;
}

export default function DictionarySearch({ className }: DictionarySearchProps) {
  const [word, setWord] = useState("");
  const [searchedWord] = useDebounce(word, 500);
  const { data, isLoading, error } = useDictionary(searchedWord);
  return (
    <div
      className={`dark:bg-white-900 margin-x-default p-4 ${className || ""}`}
    >
      <input
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="mb-4 w-full border p-2"
        placeholder="Nhập từ..."
      />

      {isLoading && <p>Đang tải...</p>}
      {error && <p>Lỗi: {error.message}</p>}

      {data?.map((entry: DictionaryEntry, entryIndex) => (
        <div key={entryIndex} className="mb-4 rounded border p-4">
          <h2 className="mb-2 text-xl font-bold">{entry.word}</h2>

          {/* Phonetics */}
          {entry.phonetics.length > 0 && (
            <div className="mb-2">
              <h3 className="font-semibold">Ngữ Âm:</h3>
              {entry.phonetics.map((p, i) => (
                <div key={i} className="mb-1 ml-4">
                  {p.text && (
                    <p
                      key={i}
                      className="mb-1 cursor-pointer text-blue-600 underline"
                      onClick={() => {
                        if (p.audio) {
                          const audio = new Audio(p.audio);
                          audio.play();
                        }
                      }}
                    >
                      {p.text}
                    </p>
                  )}
                  {p.sourceUrl && (
                    <p>
                      Nguồn:{" "}
                      <a href={p.sourceUrl} target="_blank">
                        {p.sourceUrl}
                      </a>
                    </p>
                  )}
                  {p.license && (
                    <p>
                      Giấy Phép: {p.license.name} (
                      <a href={p.license.url} target="_blank">
                        {p.license.url}
                      </a>
                      )
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Meanings */}
          {entry.meanings.length > 0 && (
            <div className="my-8">
              <h3 className="font-semibold">Các Định Nghĩa:</h3>
              {entry.meanings.map((m, mi) => (
                <ul key={mi} className="my-4 ml-4">
                  <p className="font-medium">Từ Loại: {m.partOfSpeech}</p>

                  {m.definitions.map((d, di) => (
                    <li key={di} className="mb-1 ml-4 list-decimal">
                      <p> {d.definition}</p>
                      {d.example && <p>Ví Dụ: {d.example}</p>}
                      {d.synonyms.length > 0 && (
                        <p>Synonyms: {d.synonyms.join(", ")}</p>
                      )}
                      {d.antonyms.length > 0 && (
                        <p>Antonyms: {d.antonyms.join(", ")}</p>
                      )}
                    </li>
                  ))}

                  {m.synonyms.length > 0 && (
                    <p>Từ Đồng Nghĩa: {m.synonyms.join(", ")}</p>
                  )}
                  {m.antonyms.length > 0 && (
                    <p>Từ Trái Nghĩa: {m.antonyms.join(", ")}</p>
                  )}
                </ul>
              ))}
            </div>
          )}

          {/* License */}
          {entry.license && (
            <p>
              Entry License: {entry.license.name} (
              <a href={entry.license.url} target="_blank">
                {entry.license.url}
              </a>
              )
            </p>
          )}

          {/* Source URLs */}
          {entry.sourceUrls.length > 0 && (
            <div>
              <p>Source URLs:</p>
              <ul className="ml-4 list-disc">
                {entry.sourceUrls.map((url, i) => (
                  <li key={i}>
                    <a href={url} target="_blank">
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
