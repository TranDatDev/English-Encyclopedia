import { useParams } from "react-router";

import { useDictionary } from "@/shared/hooks/useDictionary";

export default function DictionaryPage() {
  const { word } = useParams<{ word: string }>();

  const { data, isLoading, error } = useDictionary(word || "");

  if (!word) return <p>Không có từ để tra cứu.</p>;

  const partOfSpeechVI: Record<string, string> = {
    noun: "Danh từ",
    verb: "Động từ",
    adjective: "Tính từ",
    adverb: "Trạng từ",
    interjection: "Thán từ",
    pronoun: "Đại từ",
    preposition: "Giới từ",
    conjunction: "Liên từ",
    article: "Mạo từ",
    numeral: "Số từ",
  };
  return (
    <div className="margin-x-default p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="dark:text-white-800 text-2xl font-bold">
          Từ vựng đã tra: {word}
        </h1>
      </div>

      {isLoading && (
        <div className="dark:border-black-500 border-white-500 my-4 rounded border bg-white p-4 dark:bg-black">
          <p>Đang tải ...</p>
        </div>
      )}
      {error && <p>Không có kết quả tra từ</p>}

      {data?.map((entry, entryIndex) => (
        <div
          key={entryIndex}
          className="dark:border-black-500 border-white-500 my-4 rounded border bg-white p-4 dark:bg-black"
        >
          <h2 className="dark:text-white-800 mb-2 inline text-2xl font-bold">
            {entry.word}{" "}
            {data.length > 1 && (
              <sup className="text-sm text-blue-600 dark:text-blue-500">
                {entryIndex + 1}
              </sup>
            )}
          </h2>

          <div className="my-4 flex gap-8">
            {entry.phonetics.length > 0 && (
              <>
                <h3 className="dark:text-white-800 font-semibold">Phiên Âm:</h3>
                {entry.phonetics.map((p, i) =>
                  p.text ? (
                    <p
                      key={i}
                      className="mb-1 cursor-pointer text-blue-600 underline dark:text-blue-500"
                      onClick={() => {
                        if (p.audio) new Audio(p.audio).play();
                      }}
                    >
                      {p.text}
                    </p>
                  ) : null,
                )}
              </>
            )}
          </div>
          {entry.meanings.length > 0 && (
            <div className="my-8">
              <h3 className="dark:text-white-800 font-semibold">Định Nghĩa:</h3>
              {entry.meanings.map((m, mi) => (
                <div key={mi} className="dark:text-white-800 mt-4 ml-4">
                  <p className="font-medium">
                    Từ loại: {partOfSpeechVI[m.partOfSpeech] || m.partOfSpeech}
                  </p>

                  <ul className="ml-4 list-disc space-y-2">
                    {m.definitions.map((d, di) => (
                      <li key={di}>
                        <p>{d.definition}</p>
                        {d.example && (
                          <p className="italic">Ví dụ: {d.example}</p>
                        )}
                        {d.synonyms.length > 0 && (
                          <p>Từ đồng nghĩa: {d.synonyms.join(", ")}</p>
                        )}
                        {d.antonyms.length > 0 && (
                          <p>Từ trái nghĩa: {d.antonyms.join(", ")}</p>
                        )}
                      </li>
                    ))}
                  </ul>

                  {m.synonyms.length > 0 && (
                    <p>Từ đồng nghĩa (chung): {m.synonyms.join(", ")}</p>
                  )}
                  {m.antonyms.length > 0 && (
                    <p>Từ trái nghĩa (chung): {m.antonyms.join(", ")}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <section className="mt-10">
            {entry.license && (
              <p className="dark:text-white-400 text-black-400 text-sm">
                Giấy phép: {entry.license.name} (
                <a href={entry.license.url} target="_blank">
                  {entry.license.url}
                </a>
                )
              </p>
            )}

            {entry.sourceUrls.length > 0 && (
              <div>
                <p className="text-sm">Nguồn:</p>
                <ul className="ml-4 list-disc">
                  {entry.sourceUrls.map((url, i) => (
                    <li
                      key={i}
                      className="dark:text-white-400 text-black-400 text-sm"
                    >
                      <a href={url} target="_blank">
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      ))}
      <div className="flex justify-between">
        <small className="dark:text-white-400 text-black-400">
          Nguồn dữ liệu API: https://dictionaryapi.dev/
        </small>
        <a
          href={`https://translate.google.com/?hl=vi&sl=en&tl=vi&text=${word}&op=translate`}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-blue-600 underline dark:text-blue-500"
        >
          Xem nghĩa Google Dịch của {word}
        </a>
      </div>
      <div className="">
        <h3 className="dark:text-white-800 mt-8 mb-4 text-2xl font-semibold">
          Tham khảo nghĩa của <span className="underline">{word}</span> từ các
          nguồn từ điển uy tín khác
        </h3>
        <div className="grid grid-cols-3">
          <ul>
            <h4 className="dark:text-white-800 mb-2 text-xl font-medium">
              Từ điển định nghĩa (Anh - Việt)
            </h4>
            <li>
              <a
                href={`https://vi.wiktionary.org/wiki/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển Anh-Việt Wiktionary
              </a>
            </li>
            <li>
              <a
                href={`https://dict.laban.vn/find?type=1&query=${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển Anh-Việt Laban
              </a>
            </li>
            <li>
              <a
                href={`https://vdict.com/${word},1,0,0.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển Anh-Việt Vdict
              </a>
            </li>
            <li>
              <a
                href={`http://tratu.soha.vn/dict/en_vn/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển Anh-Việt Soha
              </a>
            </li>
          </ul>
          <ul>
            <h4 className="dark:text-white-800 mb-2 text-xl font-medium">
              Từ điển định nghĩa (Anh - Anh)
            </h4>
            <li>
              <a
                href={`https://en.wiktionary.org/wiki/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển định nghĩa Wiktionary
              </a>
            </li>
            <li>
              <a
                href={`https://www.oxfordlearnersdictionaries.com/definition/english/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển định nghĩa Oxford Learner's Dictionaries
              </a>
            </li>
            <li>
              <a
                href={`https://dictionary.cambridge.org/vi/dictionary/english/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển định nghĩa Cambridge
              </a>
            </li>
            <li>
              <a
                href={`https://www.merriam-webster.com/dictionary/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển định nghĩa Merriam-Webster
              </a>
            </li>
            <li>
              <a
                href={`https://www.britannica.com/dictionary/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển định nghĩa Britannica
              </a>
            </li>
            <li>
              <a
                href={`https://www.ldoceonline.com/dictionary/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển định nghĩa Longman
              </a>
            </li>
            <li>
              <a
                href={`https://www.dictionary.com/browse/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển định nghĩa Dictionary.com
              </a>
            </li>
            <li>
              <a
                href={`https://www.wordreference.com/definition/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển định nghĩa WordReference
              </a>
            </li>
            <li>
              <a
                href={`https://www.onelook.com/?w=${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển định nghĩa OneLook
              </a>
            </li>
          </ul>
          <ul>
            <h4 className="dark:text-white-800 mb-2 text-xl font-medium">
              Từ điển nhóm nghĩa (Anh - Anh)
            </h4>
            <li>
              <a
                href={`https://dictionary.cambridge.org/thesaurus/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển nhóm nghĩa Cambridge
              </a>
            </li>
            <li>
              <a
                href={`https://www.merriam-webster.com/thesaurus/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển nhóm nghĩa Merriam-Webster
              </a>
            </li>
            <li>
              <a
                href={`https://www.thesaurus.com/browse/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển nhóm nghĩa Thesaurus.com
              </a>
            </li>
            <li>
              <a
                href={`https://www.wordreference.com/synonyms/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển nhóm nghĩa WordReference
              </a>
            </li>
            <li>
              <a
                href={`https://www.onelook.com/thesaurus/?s=${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển nhóm nghĩa OneLook
              </a>
            </li>
          </ul>
          <ul>
            <h4 className="dark:text-white-800 mb-2 text-xl font-medium">
              Từ điển hợp nghĩa (Anh - Anh)
            </h4>
            <li>
              <a
                href={`https://www.just-the-word.com/main.pl?word=${word}&mode=combinations`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển hợp nghĩa Just The Word
              </a>
            </li>
            <li>
              <a
                href={`https://www.wordreference.com/englishcollocations/${word}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-blue-600 underline dark:text-blue-500"
              >
                Từ điển hợp nghĩa WordReference
              </a>
            </li>
          </ul>
        </div>
        <div className="dark:text-white-600 text-black-600 mt-8 italic">
          *Từ điển định nghĩa (Dictionary): cung cấp ý nghĩa của từ. <br />
          *Từ điển nhóm nghĩa (Thesaurus): cung cấp các từ đồng nghĩa và trái
          nghĩa. <br />
          *Từ điển hợp nghĩa (Collocation): cung cấp các cụm từ thường đi kèm
          với từ.
        </div>
      </div>
    </div>
  );
}
