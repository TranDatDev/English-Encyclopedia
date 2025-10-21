import clsx from "clsx";
import { useMemo,useState } from "react";

import extractHeadings from "@/shared/utils/extractHeadings";

import MarkdownRenderer from "./MarkdownRenderer";
import type { HeadingItem } from "./TableOfContents";
import TableOfContents from "./TableOfContents";

type MarkdownSectionProps = {
  content: string;
};

type MetaTagsProps = {
  title: string;
  description: string;
  image: string;
  slug: string;
};

function MetaTags({ title, description, image, slug }: MetaTagsProps) {
  return (
    <>
      <title>{title}</title>
      <meta property="og:image" content={image} />
      <meta name="description" content={description} />
      <meta property="og:image:alt" content={slug} />
      <meta name="twitter:image" content={image} />
      <meta property="og:type" content="article" />
      <meta property="twitter:card" content="summary_large_image" />
    </>
  );
}

function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="block ml-auto mt-10 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors print:hidden cursor-pointer"
    >
      🖨️ In ra PDF
    </button>
  );
}

export default function MarkdownSection({ content }: MarkdownSectionProps) {
  const [openTOC, setOpenTOC] = useState(false);

  // Trích headings từ markdown
  const headings: HeadingItem[] = useMemo(
    () => extractHeadings(content),
    [content]
  );

  // Metadata
  const title = headings[0]?.text ?? "Untitled";
  const description = useMemo(
    () => content.slice(0, 160).replace(/\n/g, " "),
    [content]
  );
  const slug = useMemo(() => window.location.pathname, []);
  const image = `${slug}.jpg`;

  // Class container động
  const containerClass = clsx(
    "flex justify-center py-32 px-16 border-gray-300 border print:border-0 print:p-0 bg-white shadow-xl print:shadow-none transition-all duration-300",
    openTOC ? "margin-t-default margin-x-default" : "mx-[28vw] my-16"
  );

  return (
    <>
      <MetaTags
        title={title}
        description={description}
        image={image}
        slug={slug}
      />
      <div className={containerClass}>
        <main className="prose prose-h1:text-center prose-sm max-w-none w-11/12">
          <article>
            <MarkdownRenderer content={content} />
          </article>
          <PrintButton />
        </main>
        <TableOfContents
          headings={headings}
          open={openTOC}
          setOpen={setOpenTOC}
        />
      </div>
    </>
  );
}
