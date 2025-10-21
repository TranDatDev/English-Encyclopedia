// src/features/pos/routes/route.tsx
import type { RouteObject } from "react-router";

import AptisEsolPage from "@/features/aptis-esol/pages/AptisEsolPage";
import { MarkdownSection } from "@/shared/components/markdown";
import MainLayout from "@/shared/layouts/MainLayout";
import { loadMarkdownByFeature } from "@/shared/utils/loaders/loadMarkdownFiles";

export const aptisEsolReadingList = loadMarkdownByFeature(
  "aptis-esol",
  "reading",
);
export const aptisEsolListeningList = loadMarkdownByFeature(
  "aptis-esol",
  "listening",
);
export const aptisEsolSpeakingList = loadMarkdownByFeature(
  "aptis-esol",
  "speaking",
);
export const aptisEsolWritingList = loadMarkdownByFeature(
  "aptis-esol",
  "writing",
);

export const aptisEsolList = [
  ...aptisEsolReadingList,
  ...aptisEsolListeningList,
  ...aptisEsolSpeakingList,
  ...aptisEsolWritingList,
];

export const children: RouteObject[] = aptisEsolList.map(
  ({ slug, content, subtype }) => ({
    path: `${subtype}/${slug}`,
    element: <MarkdownSection content={content} />,
  }),
);

// Route chính
const aptisEsolRoutes: RouteObject = {
  path: "aptis-esol",
  element: <MainLayout />,
  children: [{ index: true, element: <AptisEsolPage /> }, ...children],
};

export default aptisEsolRoutes;
