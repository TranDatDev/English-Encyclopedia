import slugify from "@/shared/utils/slugify";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export default function extractHeadings(content: string): HeadingItem[] {
  const lines = content.split("\n");
  const headings: HeadingItem[] = [];
  for (const line of lines) {
    const m = line.match(/^(#{1,4})\s+(.*)/);
    if (m) {
      const level = m[1].length;
      const text = m[2].trim();
      const id = slugify(text);
      headings.push({ id, text, level });
    }
  }
  return headings;
}

export function getTitle(content: string): string {
  const lines = content.split("\n");
  for (const line of lines) {
    const m = line.match(/^#\s+(.*)/);
    if (m) {
      return m[1].trim();
    }
  }
  return "Untitled";
}
