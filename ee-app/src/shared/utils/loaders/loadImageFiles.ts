export const featureList = [
  "pos",
  "phrase",
  "vocabulary",
  "grammar",
  "aptis-esol",
] as const;

export type MarkdownFeatureType = (typeof featureList)[number];

export interface ImageItem {
  type: MarkdownFeatureType;
  slug: string; // tên file không có đuôi
  url: string; // đường dẫn ảnh được xử lý bởi Vite
  subtype?: string; // thư mục con nếu có (optional)
}

const imageGlobMap = {
  pos: import.meta.glob("@/features/pos/images/**/*.{jpg,jpeg,png,webp,svg}", {
    eager: true,
  }),
  phrase: import.meta.glob(
    "@/features/phrase/images/**/*.{jpg,jpeg,png,webp,svg}",
    { eager: true }
  ),
  vocabulary: import.meta.glob(
    "@/features/vocabulary/images/**/*.{jpg,jpeg,png,webp,svg}",
    { eager: true }
  ),
  grammar: import.meta.glob(
    "@/features/grammar/images/**/*.{jpg,jpeg,png,webp,svg}",
    { eager: true }
  ),
  "aptis-esol": import.meta.glob(
    "@/features/aptis-esol/images/**/*.{jpg,jpeg,png,webp,svg}",
    { eager: true }
  ),
} satisfies Record<MarkdownFeatureType, Record<string, unknown>>;

export default function loadImagesByFeature(
  feature: MarkdownFeatureType,
  subfolder?: string
): ImageItem[] {
  const files = imageGlobMap[feature];
  if (!files) throw new Error(`Feature "${feature}" not supported.`);

  const baseFolder = `/${feature}/images/`;

  return Object.entries(files)
    .filter(([path]) =>
      subfolder ? path.includes(`${baseFolder}${subfolder}/`) : true
    )
    .map(([path, file]) => {
      const slug =
        path
          .split("/")
          .pop()
          ?.replace(/\.(jpg|jpeg|png|webp|svg)$/, "") || "";
      const url = (file as { default: string }).default;

      const relativePath = path.split(baseFolder)[1] || "";
      const folderParts = relativePath.split("/");

      const subtype =
        folderParts.length > 1 ? folderParts.slice(0, -1).join("/") : undefined;

      return {
        url,
        slug,
        type: feature,
        subtype,
      };
    });
}
