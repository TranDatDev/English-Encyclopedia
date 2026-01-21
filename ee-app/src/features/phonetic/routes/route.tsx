import { lazy } from "react";
import type { RouteObject } from "react-router";

import { createExerciseRoutes } from "@/shared/routes/CreateExerciseRoutes";

const PhoneticPage = lazy(
  () => import("@/features/phonetic/pages/PhoneticPage"),
);
const {
  phoneticList,
  phoneticPronounceExerciseList,
  phoneticStressExerciseList,
} = await import("@/features/phonetic/routes/list");

const PronounceExercise = lazy(() =>
  import("@/shared/components/exercise").then((m) => ({
    default: m.PronounceExercise,
  })),
);
const StressExercise = lazy(() =>
  import("@/shared/components/exercise").then((m) => ({
    default: m.StressExercise,
  })),
);
const MarkdownSection = lazy(() =>
  import("@/shared/components/markdown").then((m) => ({
    default: m.MarkdownSection,
  })),
);
const MainLayout = lazy(() => import("@/shared/layouts/MainLayout"));

export const children: RouteObject[] = phoneticList.map(
  ({ slug, content }) => ({
    path: slug,
    element: <MarkdownSection content={content} />,
  }),
);

export const childrenStressExercise = createExerciseRoutes(
  phoneticStressExerciseList,
  StressExercise,
  true,
);

export const childrenPronounceExercise = createExerciseRoutes(
  phoneticPronounceExerciseList,
  PronounceExercise,
  true,
);

const phoneticRoutes: RouteObject = {
  path: "phonetic",
  element: <MainLayout />,
  children: [
    { index: true, element: <PhoneticPage /> },
    ...children,
    ...childrenStressExercise,
    ...childrenPronounceExercise,
  ],
};

export default phoneticRoutes;
