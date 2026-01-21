import type {
  PronounceExerciseSet,
  StressExerciseSet,
} from "@/shared/types/exercise.type";
import { loadJsonByFeature } from "@/shared/utils/loaders/load-json-files";
import { loadMarkdownByFeature } from "@/shared/utils/loaders/load-markdown-files";

export const phoneticList = loadMarkdownByFeature("phonetic");

export const stressList = loadMarkdownByFeature("phonetic", "stress");

export const pronounceList = loadMarkdownByFeature("phonetic", "pronounce");

export const phoneticStressExerciseList = loadJsonByFeature<StressExerciseSet>(
  "phonetic",
  "stress",
);

export const phoneticPronounceExerciseList =
  loadJsonByFeature<PronounceExerciseSet>("phonetic", "pronounce");
