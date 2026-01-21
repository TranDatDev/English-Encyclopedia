import { lazy } from "react";
import type { RouteObject } from "react-router";

import type { QuizDataCompact } from "@/shared/types/quiz.type";
import { loadJsonByFeature } from "@/shared/utils/loaders/load-json-files";
import { loadMarkdownByFeature } from "@/shared/utils/loaders/load-markdown-files";

const PosPage = lazy(() => import("@/features/pos/pages/PosPage"));
const JsonSection = lazy(() =>
  import("@/shared/components/json").then((m) => ({ default: m.JsonSection })),
);
const MarkdownSection = lazy(() =>
  import("@/shared/components/markdown").then((m) => ({
    default: m.MarkdownSection,
  })),
);
const MainLayout = lazy(() => import("@/shared/layouts/MainLayout"));

export const posList = loadMarkdownByFeature("pos");

export const childrenMarkdown: RouteObject[] = posList.map(
  ({ slug, content }) => ({
    path: slug,
    element: <MarkdownSection content={content} />,
  }),
);

export const posJsonList = loadJsonByFeature<QuizDataCompact>("pos");
export const childrenJson: RouteObject[] = posJsonList.map(
  ({ slug, data }) => ({
    path: slug,
    element: <JsonSection content={data} />,
  }),
);

const posRoutes: RouteObject = {
  path: "pos",
  element: <MainLayout />,
  children: [
    { index: true, element: <PosPage /> },
    ...childrenMarkdown,
    ...childrenJson,
  ],
};

export default posRoutes;
