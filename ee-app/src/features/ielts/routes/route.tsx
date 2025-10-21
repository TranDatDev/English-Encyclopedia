// src/features/ielts/routes/route.tsx
import type { RouteObject } from "react-router";

import IeltsPage from "@/features/ielts/pages/IeltsPage";
import { JsonSection } from "@/shared/components/json";
import { MarkdownSection } from "@/shared/components/markdown";
import MainLayout from "@/shared/layouts/MainLayout";
import type { QuizDataCompact } from "@/shared/types/quiz.type";
import { loadJsonByFeature } from "@/shared/utils/loaders/loadJsonFiles";
import { loadMarkdownByFeature } from "@/shared/utils/loaders/loadMarkdownFiles";

export const ieltsListeningList = loadMarkdownByFeature("ielts", "listening");
export const ieltsReadingList = loadMarkdownByFeature("ielts", "reading");
export const ieltsSpeakingList = loadMarkdownByFeature("ielts", "speaking");
export const ieltsWritingList = loadMarkdownByFeature("ielts", "writing");
export const ieltsList = [
  ...ieltsListeningList,
  ...ieltsSpeakingList,
  ...ieltsReadingList,
  ...ieltsWritingList,
];

export const childrenMarkdown: RouteObject[] = ieltsList.map(
  ({ slug, content, subtype }) => ({
    path: `${subtype}/${slug}`,
    element: <MarkdownSection content={content} />,
  }),
);

export const ieltsJsonList = loadJsonByFeature<QuizDataCompact>("ielts");
export const childrenJson: RouteObject[] = ieltsJsonList.map(
  ({ slug, data }) => ({
    path: slug,
    element: <JsonSection content={data} />,
  }),
);
// Route chính
const ieltsRoutes: RouteObject = {
  path: "ielts",
  element: <MainLayout />,
  children: [
    { index: true, element: <IeltsPage /> },
    ...childrenMarkdown,
    ...childrenJson,
  ],
};

export default ieltsRoutes;
