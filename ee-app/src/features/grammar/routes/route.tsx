import type { RouteObject } from "react-router";

import GrammarPage from "@/features/grammar/pages/GrammarPage";
import {
  grammarList,
  grammarMultipleChoiceExerciseList,
  grammarPronounceExerciseList,
  grammarStressExerciseList,
} from "@/features/grammar/routes/list";
import MultipleChoiceExercise from "@/shared/components/exercise/components/MultipleChoiceExercise";
import PronounceExercise from "@/shared/components/exercise/components/PronounceExercise";
import StressExercise from "@/shared/components/exercise/components/StressExercise";
import { MarkdownSection } from "@/shared/components/markdown";
import MainLayout from "@/shared/layouts/MainLayout";
import { createExerciseRoutes } from "@/shared/routes/CreateExerciseRoutes";

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

// Route chính
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
