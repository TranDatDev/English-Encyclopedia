import React from "react";

type Props = {
  title: string;
  subtitle: string;
  align?:
    | ""
    | "top-left"
    | "bottom-left"
    | "top-right"
    | "bottom-right"
    | "top-middle"
    | "bottom-middle"
    | "left-middle"
    | "right-middle"
    | "left"
    | "right";
  className?: string;
  children?: React.ReactNode;
  color?: string; // hex, rgb, hsl
};

export default function ChatBubbleCard({
  title,
  subtitle,
  align = "",
  className = "",
  children,
  color = "#ff4444",
}: Props) {
  const getBeforeClass = () => {
    switch (align) {
      case "top-left":
        return "before:-top-8 before:left-0 before:rotate-180 before:border-b-[48px] before:border-b-transparent before:border-r-[48px] before:-z-10 before:border-r-[var(--bubble-color)]";
      case "bottom-left":
        return "before:-bottom-4 before:left-0 before:rotate-180 before:border-t-[48px] before:border-t-transparent before:border-r-[48px] before:-z-10 before:border-r-[var(--bubble-color)]";
      case "top-right":
        return "before:top-0 before:right-0 before:border-b-[12px] before:border-b-transparent before:border-l-[48px] before:border-l-[var(--bubble-color)]";
      case "bottom-right":
        return "before:-bottom-4 before:right-0 before:rotate-180 before:border-t-[48px] before:border-t-transparent before:border-l-[48px] before:-z-10 before:border-l-[var(--bubble-color)]";
      case "top-middle":
        return "before:top-0 before:left-1/2 before:-translate-x-1/2 before:border-x-[12px] before:border-x-transparent before:border-b-[16px] before:border-b-[var(--bubble-color)]";
      case "bottom-middle":
        return "before:-bottom-4 before:left-1/2 before:-translate-x-1/2 before:border-x-[48px] before:border-x-transparent before:border-t-[48px] before:border-t-[#111] before:-z-10 before:border-t-[var(--bubble-color)]";
      case "left-middle":
        return "before:top-1/2 before:-translate-y-1/2 before:-left-4 before:border-y-[12px] before:border-y-transparent before:border-r-[16px] before:border-r-[var(--bubble-color)]";
      case "right-middle":
        return "before:top-1/2 before:-translate-y-1/2 before:-right-4 before:border-y-[12px] before:border-y-transparent before:border-l-[16px] before:border-l-[var(--bubble-color)]";
      // case "left":
      //   return "before:-top-4 before:left-0 before:rotate-180 before:border-b-[48px] before:border-b-transparent before:border-r-[48px] before:-z-10 before:border-r-[var(--bubble-color)] after:-bottom-4 after:left-0 after:rotate-180 after:border-t-[48px] after:border-t-transparent after:border-r-[48px] after:-z-10 after:border-r-[var(--bubble-color)] border-r-4 before:outline-4 before:outline-solid before:-outline-offset-4 before:outline-[var(--bubble-color)] after:outline-4 after:outline-solid after:-outline-offset-4 after:outline-[var(--bubble-color)]";
      // case "right":
      //   return "before:-top-4 before:right-0 before:rotate-180 before:border-b-[48px] before:border-b-transparent before:border-l-[48px] before:-z-10 before:border-l-[var(--bubble-color)] after:-bottom-4 after:right-0 after:rotate-180 after:border-t-[48px] after:border-t-transparent after:border-l-[48px] after:-z-10 after:border-l-[var(--bubble-color)] border-l-4 before:outline-4 before:outline-solid before:-outline-offset-4 before:outline-[var(--bubble-color)] after:outline-4 after:outline-solid after:-outline-offset-4 after:outline-[var(--bubble-color)]";
      case "left":
        return "border-r-4";
      case "right":
        return "border-l-4";
      default:
        return "";
    }
  };

  // Khai báo style với typing an toàn
  const style: React.CSSProperties & Record<string, string> = {
    "--bubble-color": color,
  };

  return (
    <div
      className={`
        relative rounded-2xl px-5 py-4 w-fit
        text-base leading-snug text-white
        bg-[var(--bubble-color)]
        before:content-[''] before:absolute
        after:content-[''] after:absolute
        ${getBeforeClass()}
        ${className}

      `}
      style={style}
    >
      <div className="font-semibold text-2xl mb-1">{title}</div>
      <div className="text-xl mb-4">{subtitle}</div>
      <div className=""> {children}</div>
    </div>
  );
}
