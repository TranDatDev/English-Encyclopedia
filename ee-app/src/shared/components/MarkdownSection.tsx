import Markdown from "markdown-to-jsx";
import MarkdownH1 from "@/shared/components/MarkdownH1";
import MarkdownH2 from "@/shared/components/MarkdownH2";
import MarkdownH3 from "@/shared/components/MarkdownH3";
import MarkdownH4 from "@/shared/components/MarkdownH4";
import extractHeadings from "@/shared/utils/extractHeadings";
import slugify from "@/shared/utils/slugify";
import { useState } from "react";
import { cn } from "@/shared/utils/cn";
export default function MarkdownSection({ content }: { content: string }) {
  const headings = extractHeadings(content);
  const title = headings.length > 0 ? headings[0].text : "Untitled";
  return (
    <>
      <title>{title}</title>
      <div className="flex margin-t-default margin-default justify-center py-20 px-16 border-gray-300 border print:border-0 print:p-0 bg-white shadow-lg print:shadow-none">
        <main className="prose prose-md max-w-none w-11/12">
          <Markdown
            options={{
              overrides: {
                // h1: {
                //   component: ({ children }: { children: React.ReactNode }) => {
                //     const text = String(children);
                //     const id = slugify(text);
                //     return <MarkdownH1 id={id}>{children}</MarkdownH1>;
                //   },
                // },
                // h2: {
                //   component: ({ children }: { children: React.ReactNode }) => {
                //     const text = String(children);
                //     const id = slugify(text);
                //     return <MarkdownH2 id={id}>{children}</MarkdownH2>;
                //   },
                // },
                // h3: {
                //   component: ({ children }: { children: React.ReactNode }) => {
                //     const text = String(children);
                //     const id = slugify(text);
                //     return <MarkdownH3 id={id}>{children}</MarkdownH3>;
                //   },
                // },
                // h4: {
                //   component: ({ children }: { children: React.ReactNode }) => {
                //     const text = String(children);
                //     const id = slugify(text);
                //     return <MarkdownH4 id={id}>{children}</MarkdownH4>;
                //   },
                // },
                strong: {
                  component: ({ children }: { children: React.ReactNode }) => {
                    return (
                      <strong className="font-semibold text-gray-800">
                        {children}
                      </strong>
                    );
                  },
                },
                // --- TABLE ---
                table: {
                  props: {
                    className:
                      "w-full border border-gray-300 rounded-lg overflow-hidden shadow-lg mt-6 mb-6",
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
                      "border-l-8 border-r-8 border-y-1 border-y-gray-300 border-blue-300 bg-white shadow-xl text-gray-700 italic p-2 rounded-md my-4 text-center",
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
          <button
            onClick={() => window.print()}
            className="block ml-auto mt-10 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors print:hidden cursor-pointer"
          >
            🖨️ In ra PDF
          </button>
        </main>
        <TOC headings={headings} />
      </div>
    </>
  );
}

function TOC({
  headings,
}: {
  headings: { id: string; text: string; level: number }[];
}) {
  const [open, setOpen] = useState(true); // Toggle TOC on desktop

  const stylesByLevel: Record<1 | 2 | 3, string> = {
    1: "pl-0 font-bold text-base text-gray-900 hover:bg-gray-100",
    2: "pl-0 font-medium text-sm text-gray-700 hover:bg-gray-50",
    3: "pl-4 text-sm text-gray-500 italic hover:bg-gray-50",
  };

  const baseItem =
    "block truncate transition-colors duration-200 rounded px-2 py-1";

  return (
    <>
      {/* TOC Toggle button for desktop */}
      <div className="hidden md:block fixed bottom-8 right-8">
        <button
          onClick={() => setOpen(!open)}
          className=" bg-blue-200 border border-gray-300 px-4 py-2 rounded-md font-medium"
        >
          {open ? "Tắt Mục Lục" : "Mở Mục Lục"}
        </button>
      </div>

      {/* Desktop TOC area */}
      <aside
        className={`
          hidden md:block sticky top-20 h-full
          transition-all duration-300
          ${open ? "w-4/12 pr-2 ml-8" : "w-0"} 
        `}
      >
        <div
          className={`space-y-1 border-r-2 border-gray-300 text-sm leading-relaxed
            transition-opacity duration-300
            ${
              open
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }
          `}
        >
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
      </aside>
    </>
  );
}
