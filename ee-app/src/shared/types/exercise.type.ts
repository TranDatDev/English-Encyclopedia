export type MultipleChoiceData = [string, string, number, string?];

export type StressData = [string[], string[], number[], number, string?];

export type PronounceData = [string[], string[], number, string?];

export interface ExerciseSet<T> {
  title: string;
  sounds?: string[];
  data: T[];
}

export type MultipleChoiceExerciseSet = ExerciseSet<MultipleChoiceData>;

export type StressExerciseSet = ExerciseSet<StressData>;

export type PronounceExerciseSet = ExerciseSet<PronounceData>;
