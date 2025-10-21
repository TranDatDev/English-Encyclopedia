import { featureList } from "@/shared/constants/features.constant";
import slugify from "@/shared/utils/slugify";

export type MarkdownFeatureType = (typeof featureList)[number];

export interface MarkdownItem {
  type: MarkdownFeatureType;
  slug: string;
  label: string;
  content: string;
  subtype?: string;
}

// ==== 2. Map mỗi feature với glob tương ứng ====
const globMap = {
  pos: import.meta.glob("@/features/pos/markdown/**/*.md", { eager: true }),
  phrase: import.meta.glob("@/features/phrase/markdown/**/*.md", {
    eager: true,
  }),
  vocabulary: import.meta.glob("@/features/vocabulary/markdown/**/*.md", {
    eager: true,
  }),
  grammar: import.meta.glob("@/features/grammar/markdown/**/*.md", {
    eager: true,
  }),
  "aptis-esol": import.meta.glob("@/features/aptis-esol/markdown/**/*.md", {
    eager: true,
  }),
  ielts: import.meta.glob("@/features/ielts/markdown/**/*.md", { eager: true }),
  toeic: import.meta.glob("@/features/toeic/markdown/**/*.md", {
    eager: true,
  }),
  toefl: import.meta.glob("@/features/toefl/markdown/**/*.md", { eager: true }),
  vstep: import.meta.glob("@/features/vstep/markdown/**/*.md", { eager: true }),
  phonetic: import.meta.glob("@/features/phonetic/markdown/**/*.md", {
    eager: true,
  }),
} satisfies Record<MarkdownFeatureType, Record<string, unknown>>;

// ==== 3. Hàm load markdown theo feature ====
export function loadMarkdownByFeature(
  feature: MarkdownFeatureType,
  subfolder?: string,
): MarkdownItem[] {
  const files = globMap[feature];
  if (!files) throw new Error(`Feature "${feature}" not supported.`);

  const baseFolder = `/${feature}/markdown/`;

  return Object.entries(files)
    .filter(([path]) =>
      subfolder ? path.includes(`${baseFolder}${subfolder}/`) : true,
    )
    .map(([path, file]) => {
      const name = path.split("/").pop()?.replace(".md", "") || "";
      const rawContent = (file as { default: string }).default;

      // Lấy tiêu đề từ dòng đầu tiên có "#"
      const match = rawContent.match(/^#\s+(.*)/m);
      const label = match?.[1] || name.charAt(0).toUpperCase() + name.slice(1);

      return {
        type: feature,
        slug: slugify(name),
        label,
        content: rawContent,
        subtype: subfolder,
      };
    });
}
