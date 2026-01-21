import type {
  MultipleChoiceExerciseSet,
  PronounceExerciseSet,
  StressExerciseSet,
} from "@/shared/types/exercise.type";
import { loadJsonByFeature } from "@/shared/utils/loaders/load-json-files";
import { loadMarkdownByFeature } from "@/shared/utils/loaders/load-markdown-files";

export const grammarList = loadMarkdownByFeature("grammar");

export const activeTenseList = loadMarkdownByFeature("grammar", "tense/active");
export const passiveTenseList = loadMarkdownByFeature(
  "grammar",
  "tense/passive",
);

export const grammarMultipleChoiceExerciseList =
  loadJsonByFeature<MultipleChoiceExerciseSet>("grammar", "multiple-choice");

export const grammarStressExerciseList = loadJsonByFeature<StressExerciseSet>(
  "grammar",
  "stress",
);

export const grammarPronounceExerciseList =
  loadJsonByFeature<PronounceExerciseSet>("grammar", "pronounce");
