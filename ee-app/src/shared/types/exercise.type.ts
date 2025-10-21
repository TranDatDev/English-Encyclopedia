export type MultipleChoiceExerciseData = [string, string, number, string?];

export type StressExerciseData = [
  string[],
  string[],
  number[],
  number,
  string?,
];

export type PronounceExerciseData = [string[], string[], number, string?];

export interface ExerciseSet<T> {
  title: string;
  data: T[];
}

export type MultipleChoiceExerciseSet = ExerciseSet<MultipleChoiceExerciseData>;
export type StressExerciseSet = ExerciseSet<StressExerciseData>;
export type PronounceExerciseSet = ExerciseSet<PronounceExerciseData>;
