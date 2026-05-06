// GymPlan domain types

export type BodyPart =
  | "Chest"
  | "Back"
  | "Shoulders"
  | "Arms"
  | "Legs"
  | "Core";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type Equipment = "Bodyweight" | "Dumbbell" | "Barbell" | "Machine" | "Cable";

export interface Exercise {
  id: string;
  name: string;
  bodyParts: BodyPart[];
  difficulty: Difficulty;
  equipment: Equipment;
  defaultSets: number;
  defaultReps: number;
  description?: string;
}

export interface WorkoutExercise extends Exercise {
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
  completedSets?: number;
}

export interface Workout {
  id: string;
  name: string;
  exercises: WorkoutExercise[];
  presetKey?: string;
  isCustom?: boolean;
}

export interface CompletedWorkout {
  id: string;
  workoutId: string;
  name: string;
  date: string; // ISO
  durationSec: number;
  exercises: WorkoutExercise[];
}

export interface Goal {
  id: string;
  exerciseId: string;
  exerciseName: string;
  targetWeight: number;
  currentWeight: number;
  unit: "lb" | "kg";
  history: { date: string; weight: number }[];
}

export interface StreakState {
  count: number;
  longest: number;
  lastWorkoutDate: string | null; // ISO date (yyyy-mm-dd)
  safetyDaysRemaining: number;
  safetyDaysAllowed: number;
}

export interface Settings {
  notificationsEnabled: boolean;
  safetyDaysAllowed: 1 | 2;
  unit: "lb" | "kg";
  restSeconds: number;
}
