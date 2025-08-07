export const featureList = ["pos", "phrase", "vocabulary", "grammar"] as const;
export type MarkdownFeatureType = (typeof featureList)[number];

export interface MarkdownItem {
  type: MarkdownFeatureType;
  slug: string;
  label: string;
  content: string;
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
} satisfies Record<MarkdownFeatureType, Record<string, unknown>>;

// ==== 3. Hàm load markdown theo feature ====
export function loadMarkdownByFeature(
  feature: MarkdownFeatureType,
  subfolder?: string
): MarkdownItem[] {
  const files = globMap[feature];
  if (!files) throw new Error(`Feature "${feature}" not supported.`);

  const baseFolder = `/${feature}/markdown/`;

  return Object.entries(files)
    .filter(([path]) =>
      subfolder ? path.includes(`${baseFolder}${subfolder}/`) : true
    )
    .map(([path, file]) => {
      const name = path.split("/").pop()?.replace(".md", "") || "";
      const rawContent = (file as { default: string }).default;

      const match = rawContent.match(/^#\s+(.*)/m);
      const label = match?.[1] || name.charAt(0).toUpperCase() + name.slice(1);

      const relativePath = path.split(baseFolder)[1] || "";
      const folderParts = relativePath.split("/");
      const subtype =
        folderParts.length > 1 ? folderParts.slice(0, -1).join("/") : undefined;

      return {
        type: feature,
        slug: name,
        label,
        content: rawContent,
        subtype,
      };
    });
}
