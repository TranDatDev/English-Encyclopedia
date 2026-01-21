import { lazy } from "react";
import type { RouteObject } from "react-router";

import { loadMarkdownByFeature } from "@/shared/utils/loaders/load-markdown-files";

const AptisEsolPage = lazy(
  () => import("@/features/aptis-esol/pages/AptisEsolPage"),
);
const MarkdownSection = lazy(() =>
  import("@/shared/components/markdown").then((m) => ({
    default: m.MarkdownSection,
  })),
);
const MainLayout = lazy(() => import("@/shared/layouts/MainLayout"));

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

const aptisEsolRoutes: RouteObject = {
  path: "aptis-esol",
  element: <MainLayout />,
  children: [{ index: true, element: <AptisEsolPage /> }, ...children],
};

export default aptisEsolRoutes;
