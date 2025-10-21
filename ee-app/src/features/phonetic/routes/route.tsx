import type { RouteObject } from "react-router";

import PhoneticPage from "@/features/phonetic/pages/PhoneticPage";
import {
  phoneticList,
  phoneticPronounceExerciseList,
  phoneticStressExerciseList,
} from "@/features/phonetic/routes/list";
import {
  PronounceExercise,
  StressExercise,
} from "@/shared/components/exercise";
import { MarkdownSection } from "@/shared/components/markdown";
import MainLayout from "@/shared/layouts/MainLayout";
import { createExerciseRoutes } from "@/shared/routes/CreateExerciseRoutes";

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

// Route chính
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
