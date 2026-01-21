import type { ReactNode } from "react";

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5;
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
};

export function Heading({
  level = 1,
  children,
  className = "",
  align = "left",
}: HeadingProps) {
  const Tag = `h${level}` as React.ElementType;

  const base = "mb-3 sm:mb-4";

  const sizes: Record<1 | 2 | 3 | 4 | 5, string> = {
    1: "text-2xl md:text-3xl text-black-900 dark:text-white-900 font-bold",
    2: "text-xl md:text-2xl text-black-800 dark:text-white-800 font-bold",
    3: "text-lg md:text-xl text-black-700 dark:text-white-700 font-medium",
    4: "text-base md:text-lg text-black-600 dark:text-white-600 font-normal",
    5: "text-sm md:text-base text-black-500 dark:text-white-500 font-light",
  };

  const alignments: Record<"left" | "center" | "right", string> = {
    left: "",
    center: "text-center",
    right: "text-right",
  };

  const appliedClassName = [base, sizes[level], alignments[align], className]
    .filter(Boolean)
    .join(" ");

  return <Tag className={appliedClassName}>{children}</Tag>;
}
