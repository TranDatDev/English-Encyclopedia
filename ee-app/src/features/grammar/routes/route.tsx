import { lazy } from "react";
import type { RouteObject } from "react-router";

import {
  grammarList,
  grammarMultipleChoiceExerciseList,
  grammarPronounceExerciseList,
  grammarStressExerciseList,
} from "@/features/grammar/routes/list";
import { createExerciseRoutes } from "@/shared/routes/CreateExerciseRoutes";

const GrammarPage = lazy(() => import("@/features/grammar/pages/GrammarPage"));
const MultipleChoiceExercise = lazy(
  () =>
    import("@/shared/components/exercise/components/MultipleChoiceExercise"),
);
const PronounceExercise = lazy(
  () => import("@/shared/components/exercise/components/PronounceExercise"),
);
const StressExercise = lazy(
  () => import("@/shared/components/exercise/components/StressExercise"),
);
const MarkdownSection = lazy(() =>
  import("@/shared/components/markdown").then((m) => ({
    default: m.MarkdownSection,
  })),
);
const MainLayout = lazy(() => import("@/shared/layouts/MainLayout"));


export const childrenMultipleChoiceExercise = createExerciseRoutes(
  grammarMultipleChoiceExerciseList,
  MultipleChoiceExercise,
  false,
);

export const childrenStressExercise = createExerciseRoutes(
  grammarStressExerciseList,
  StressExercise,
  false,
);

export const childrenPronounceExercise = createExerciseRoutes(
  grammarPronounceExerciseList,
  PronounceExercise,
  false,
);

export const children: RouteObject[] = grammarList.map(({ slug, content }) => ({
  path: slug,
  element: <MarkdownSection content={content} />,
}));

// --------------------------------------------------------------------

const grammarRoutes: RouteObject = {
  path: "grammar",
  element: <MainLayout />,
  children: [
    { index: true, element: <GrammarPage /> },
    ...children,
    ...childrenMultipleChoiceExercise,
    ...childrenStressExercise,
    ...childrenPronounceExercise,
  ],
};

export default grammarRoutes;
