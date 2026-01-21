import clsx from "clsx";
import { useMemo, useState } from "react";

import extractHeadings from "@/shared/utils/extract-headings";

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
      className="mt-10 ml-auto block cursor-pointer rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 print:hidden"
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
    [content],
  );

  // Metadata
  const title = headings[0]?.text ?? "Untitled";
  const description = useMemo(
    () => content.slice(0, 160).replace(/\n/g, " "),
    [content],
  );
  const slug = useMemo(() => window.location.pathname, []);
  const image = `${slug}.jpg`;

  // Class container động
  const containerClass = clsx(
    "flex justify-center lg:py-32 lg:px-16 md:py-16 md:px-8 py-8 px-4 border-white-600 dark:border-black-600 border print:border-0 print:p-0 bg-white-950 dark:bg-black-800 shadow-xl print:shadow-none transition-all duration-300",
    openTOC
      ? "margin-t-default margin-x-default"
      : "mx-[4vw] md:mx-[8vw] lg:mx-[24vw] my-16",
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
        <main className="prose prose-h1:text-center prose-sm text-black-950 dark:text-white-950 w-11/12 max-w-none">
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
