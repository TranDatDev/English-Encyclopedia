import clsx from "clsx";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

function TOCToggleButton({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
}) {
  return (
    <div className="fixed right-8 bottom-8 z-50 hidden md:block">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md border border-gray-300 bg-blue-200 px-4 py-2 font-medium"
      >
        {open ? "Tắt Mục Lục" : "Mở Mục Lục"}
      </button>
    </div>
  );
}

export default function TableOfContents({
  headings,
  open,
  setOpen,
}: TableOfContentsProps) {
  const stylesByLevel: Record<1 | 2 | 3, string> = {
    1: "pl-0 font-bold text-base text-gray-900 hover:bg-gray-100",
    2: "pl-0 font-medium text-sm text-gray-700 hover:bg-gray-50",
    3: "pl-4 text-sm text-gray-500 italic hover:bg-gray-50",
  };

  const baseItem =
    "block truncate transition-colors duration-200 rounded px-2 py-1";

  return (
    <>
      <TOCToggleButton open={open} setOpen={setOpen} />

      <aside
        className={clsx(
          "sticky top-40 hidden h-full transition-all duration-300 md:block",
          open ? "ml-8 w-4/12" : "w-0",
        )}
      >
        <nav
          className={clsx(
            "space-y-1 border-r-2 border-gray-300 text-sm leading-relaxed transition-opacity duration-300",
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
        >
          {headings.map(({ id, text, level }) => (
            <a
              key={id}
              href={`#${id}`}
              className={clsx(baseItem, stylesByLevel[level as 1 | 2 | 3])}
              title={`Jump to ${text}`}
            >
              {text}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
