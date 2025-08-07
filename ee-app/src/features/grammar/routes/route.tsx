// src/features/pos/routes/route.tsx
import type { RouteObject } from "react-router";
import MainLayout from "@/shared/layouts/MainLayout";
import GrammarPage from "@/features/grammar/pages/GrammarPage";
import MarkdownSection from "@/shared/components/MarkdownSection";
import { loadMarkdownByFeature } from "@/shared/utils/loadMarkdownFiles";

export const grammarList = loadMarkdownByFeature("grammar");

export const children: RouteObject[] = grammarList.map(({ slug, content }) => ({
  path: slug,
  element: <MarkdownSection content={content} />,
}));

// Route chính
const grammarRoutes: RouteObject = {
  path: "grammar",
  element: <MainLayout />,
  children: [{ index: true, element: <GrammarPage /> }, ...children],
};

export default grammarRoutes;
