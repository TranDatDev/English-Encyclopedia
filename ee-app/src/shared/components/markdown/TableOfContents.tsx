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
    <div className="hidden md:block fixed bottom-8 right-8 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-200 border border-gray-300 px-4 py-2 rounded-md font-medium"
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
          "hidden md:block sticky top-40 h-full transition-all duration-300 bg-white",
          open ? "w-4/12 ml-8" : "w-0"
        )}
      >
        <nav
          className={clsx(
            "space-y-1 border-r-2 border-gray-300 text-sm leading-relaxed transition-opacity duration-300",
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
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
