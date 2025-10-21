// src/features/pos/routes/route.tsx
import type { RouteObject } from "react-router";

import PosPage from "@/features/pos/pages/PosPage";
import { JsonSection } from "@/shared/components/json";
import { MarkdownSection } from "@/shared/components/markdown";
import MainLayout from "@/shared/layouts/MainLayout";
import type { QuizDataCompact } from "@/shared/types/quiz.type";
import { loadJsonByFeature } from "@/shared/utils/loaders/loadJsonFiles";
import { loadMarkdownByFeature } from "@/shared/utils/loaders/loadMarkdownFiles";

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
// Route chính
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
