import Markdown from "markdown-to-jsx";
import MarkdownH1 from "@/shared/components/MarkdownH1";
import MarkdownH2 from "@/shared/components/MarkdownH2";
import MarkdownH3 from "@/shared/components/MarkdownH3";
import MarkdownH4 from "@/shared/components/MarkdownH4";
import extractHeadings from "@/shared/utils/extractHeadings";
import slugify from "@/shared/utils/slugify";
import { useState } from "react";
export default function MarkdownSection({ content }: { content: string }) {
  const headings = extractHeadings(content);

  return (
    <div className="flex gap-8 margin-default pt-8">
      <main className="w-3/4 prose prose-lg max-w-none">
        <Markdown
          options={{
            overrides: {
              h1: {
                component: ({ children }: { children: React.ReactNode }) => {
                  const text = String(children);
                  const id = slugify(text);
                  return <MarkdownH1 id={id}>{children}</MarkdownH1>;
                },
              },
              h2: {
                component: ({ children }: { children: React.ReactNode }) => {
                  const text = String(children);
                  const id = slugify(text);
                  return <MarkdownH2 id={id}>{children}</MarkdownH2>;
                },
              },
              h3: {
                component: ({ children }: { children: React.ReactNode }) => {
                  const text = String(children);
                  const id = slugify(text);
                  return <MarkdownH3 id={id}>{children}</MarkdownH3>;
                },
              },
              h4: {
                component: ({ children }: { children: React.ReactNode }) => {
                  const text = String(children);
                  const id = slugify(text);
                  return <MarkdownH4 id={id}>{children}</MarkdownH4>;
                },
              },
              // --- TABLE ---
              table: {
                props: {
                  className:
                    "w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm mt-6 mb-6",
                },
              },
              thead: {
                props: {
                  className: "bg-blue-200",
                },
              },
              th: {
                props: {
                  className:
                    "border px-4 py-2 text-left text-gray-800 font-semibold text-sm",
                },
              },
              td: {
                props: {
                  className:
                    "border px-4 py-2 text-sm text-gray-700 bg-white even:bg-gray-50",
                },
              },
              tr: {
                props: {
                  className:
                    "even:bg-gray-50 hover:bg-blue-300 transition-colors",
                },
              },

              // --- LISTS ---
              ul: {
                props: {
                  className: "list-disc list-inside my-4 text-gray-800",
                },
              },
              ol: {
                props: {
                  className: "list-decimal list-inside my-4 text-gray-800",
                },
              },
              li: {
                props: {
                  className: "mb-1",
                },
              },

              // --- BLOCKQUOTE ---
              blockquote: {
                props: {
                  className:
                    "border-l-4 border-blue-300 bg-blue-50 text-gray-700 italic p-4 rounded-md my-4",
                },
              },

              // --- INLINE CODE ---
              code: {
                props: {
                  className:
                    "bg-gray-100 text-pink-700 font-mono px-1.5 py-0.5 rounded text-inherit shadow-sm",
                },
              },

              // --- CODE BLOCK ---
              pre: {
                props: {
                  className:
                    "bg-gray-900 text-white rounded-md p-4 my-4 overflow-x-auto text-sm",
                },
              },

              // --- HORIZONTAL RULE ---
              hr: {
                props: {
                  className: "my-8 border-t border-gray-300",
                },
              },

              // --- IMAGES ---
              img: {
                props: {
                  className: "rounded-md max-w-full h-auto my-4 shadow-sm",
                },
              },

              // --- LINKS ---
              a: {
                props: {
                  className:
                    "text-blue-600 underline hover:text-blue-800 transition-colors",
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
              },
            },
          }}
        >
          {content}
        </Markdown>
      </main>
      <TOC headings={headings} />
    </div>
  );
}

function TOC({
  headings,
}: {
  headings: { id: string; text: string; level: number }[];
}) {
  const [open, setOpen] = useState(false);

  const stylesByLevel: Record<1 | 2 | 3, string> = {
    1: "pl-0 font-bold text-base text-gray-900 hover:bg-gray-100",
    2: "pl-0 font-medium text-sm text-gray-700 hover:bg-gray-50",
    3: "pl-4 text-sm text-gray-500 italic hover:bg-gray-50",
  };

  const baseItem =
    "block truncate transition-colors duration-200 rounded px-2 py-1";

  return (
    <>
      {/* Mobile TOC toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setOpen(!open)}
          className="bg-gray-100 border border-gray-300 px-4 py-2 rounded text-sm font-medium"
        >
          {open ? "Ẩn mục lục" : "Hiện mục lục"}
        </button>

        {open && (
          <div className="mt-2 border border-gray-200 rounded p-2 space-y-1 bg-white shadow">
            {headings.map(({ id, text, level }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`${baseItem} ${stylesByLevel[level as 1 | 2 | 3]}`}
              >
                {text}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Desktop TOC */}
      <aside className="hidden md:block w-1/4 sticky top-20 h-fit space-y-1 border-r-2 pr-2 border-gray-300 mt-4 text-sm leading-relaxed">
        {headings.map(({ id, text, level }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`${baseItem} ${stylesByLevel[level as 1 | 2 | 3]}`}
          >
            {text}
          </a>
        ))}
      </aside>
    </>
  );
}
