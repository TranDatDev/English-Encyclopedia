import { featureList } from "@/shared/constants/features.constant";
import slugify from "@/shared/utils/slugify";

export type JsonFeatureType = (typeof featureList)[number];

export interface JsonItem<T> {
  type: JsonFeatureType;
  slug: string;
  label: string;
  data: T;
  subtype?: string;
}

// ==== 1. Map mỗi feature với glob tương ứng ====
const globMap = {
  pos: import.meta.glob("@/features/pos/json/**/*.json", { eager: true }),
  phrase: import.meta.glob("@/features/phrase/json/**/*.json", { eager: true }),
  vocabulary: import.meta.glob("@/features/vocabulary/json/**/*.json", {
    eager: true,
  }),
  grammar: import.meta.glob("@/features/grammar/json/**/*.json", {
    eager: true,
  }),
  "aptis-esol": import.meta.glob("@/features/aptis-esol/json/**/*.json", {
    eager: true,
  }),
  ielts: import.meta.glob("@/features/ielts/json/**/*.json", { eager: true }),
  toeic: import.meta.glob("@/features/toeic/json/**/*.json", { eager: true }),
  toefl: import.meta.glob("@/features/toefl/json/**/*.json", { eager: true }),
  vstep: import.meta.glob("@/features/vstep/json/**/*.json", { eager: true }),
  phonetic: import.meta.glob("@/features/phonetic/json/**/*.json", {
    eager: true,
  }),
} satisfies Record<JsonFeatureType, Record<string, { default: unknown }>>;

// ==== 2. Hàm load JSON theo feature ====
export function loadJsonByFeature<T>(
  feature: JsonFeatureType,
  subfolder?: string,
): JsonItem<T>[] {
  const files = globMap[feature];
  if (!files) throw new Error(`Feature "${feature}" not supported.`);

  const baseFolder = `/${feature}/json/`;

  return Object.entries(files)
    .filter(
      ([path]) => !subfolder || path.includes(`${baseFolder}${subfolder}/`),
    )
    .map(([path, file]) => {
      const name =
        path
          .split("/")
          .pop()
          ?.replace(/\.min\.json$|\.json$/i, "") || "";

      const jsonData = (file as { default: T }).default;

      return {
        type: feature,
        slug: slugify(name),
        label: name.charAt(0).toUpperCase() + name.slice(1),
        data: jsonData,
        subtype: subfolder,
      };
    });
}
