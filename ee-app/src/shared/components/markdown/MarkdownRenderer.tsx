import Markdown from "markdown-to-jsx";

import slugify from "@/shared/utils/slugify";

const styles = {
  headings: "scroll-mt-20",
  strong: "font-semibold text-gray-800",
  table:
    "w-full border border-gray-300 rounded-lg overflow-hidden shadow-lg my-6",
  thead: "bg-blue-200",
  th: "border px-4 py-2 text-left text-gray-800 font-semibold text-sm",
  td: "border px-4 py-2 text-sm text-gray-700 bg-white even:bg-gray-50",
  tr: "even:bg-gray-50 hover:bg-blue-300 transition-colors",
  ul: "list-disc list-inside my-4 text-gray-800",
  ol: "list-decimal list-inside my-4 text-gray-800",
  li: "mb-1 font-sans",
  blockquote: `border-l-4 border-blue-300 bg-gray-50 text-gray-800 text-justify 
              leading-relaxed pl-5 pr-4 py-3 my-6 rounded-sm shadow-md`,
  code: "bg-gray-100 text-pink-700 font-mono px-1.5 py-0.5 rounded text-inherit shadow-sm",
  pre: "bg-gray-900 text-white rounded-md p-4 my-4 overflow-x-auto text-sm",
  hr: "my-8 border-t border-gray-300",
  img: "rounded-md max-w-full h-auto my-4 shadow-sm",
  a: "text-blue-600 underline hover:text-blue-800 transition-colors",
};

// Tạo các component heading với id tự động
const createHeading =
  (Tag: "h1" | "h2" | "h3" | "h4") =>
  ({ children }: { children: React.ReactNode }) => {
    const text = String(children) || "heading";
    return (
      <Tag id={slugify(text)} className={styles.headings}>
        {children}
      </Tag>
    );
  };

const overrides = {
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  strong: { props: { className: styles.strong } },
  table: { props: { className: styles.table } },
  thead: { props: { className: styles.thead } },
  th: { props: { className: styles.th } },
  td: { props: { className: styles.td } },
  tr: { props: { className: styles.tr } },
  ul: { props: { className: styles.ul } },
  ol: { props: { className: styles.ol } },
  li: { props: { className: styles.li } },
  blockquote: { props: { className: styles.blockquote } },
  code: { props: { className: styles.code } },
  pre: { props: { className: styles.pre } },
  hr: { props: { className: styles.hr } },
  img: { props: { className: styles.img } },
  a: {
    props: {
      className: styles.a,
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return <Markdown options={{ overrides }}>{content}</Markdown>;
}
