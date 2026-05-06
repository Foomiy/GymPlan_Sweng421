// Local-storage backed app store. Replace with Lovable Cloud later without UI changes.
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CompletedWorkout,
  Exercise,
  Goal,
  Settings,
  StreakState,
  Workout,
  WorkoutExercise,
} from "./types";

interface AppState {
  customWorkouts: Workout[];
  customExercises: Exercise[];
  completedWorkouts: CompletedWorkout[];
  goals: Goal[];
  streak: StreakState;
  settings: Settings;
  activeSession: {
    workout: Workout;
    startedAt: number;
  } | null;

  startSession: (workout: Workout) => void;
  updateSessionExercise: (exerciseId: string, patch: Partial<WorkoutExercise>) => void;
  endSession: () => CompletedWorkout | null;
  cancelSession: () => void;

  saveCustomWorkout: (workout: Workout) => void;
  deleteCustomWorkout: (id: string) => void;

  addCustomExercise: (e: Omit<Exercise, "id">) => Exercise;
  deleteCustomExercise: (id: string) => void;

  addGoal: (g: Omit<Goal, "id" | "history">) => void;
  updateGoal: (id: string, currentWeight: number) => void;
  deleteGoal: (id: string) => void;

  updateSettings: (patch: Partial<Settings>) => void;
  resetAll: () => void;
}

const todayISO = () => new Date().toISOString().slice(0, 10);

const daysBetween = (aISO: string, bISO: string) => {
  const a = new Date(aISO + "T00:00:00").getTime();
  const b = new Date(bISO + "T00:00:00").getTime();
  return Math.round((b - a) / 86400000);
};

const initialStreak: StreakState = {
  count: 0,
  longest: 0,
  lastWorkoutDate: null,
  safetyDaysRemaining: 2,
  safetyDaysAllowed: 2,
};

const initialSettings: Settings = {
  notificationsEnabled: true,
  safetyDaysAllowed: 2,
  unit: "lb",
  restSeconds: 60,
};

const computeStreakAfterWorkout = (s: StreakState): StreakState => {
  const today = todayISO();
  if (s.lastWorkoutDate === today) return s; // already counted today
  if (!s.lastWorkoutDate) {
    return {
      ...s,
      count: 1,
      longest: Math.max(1, s.longest),
      lastWorkoutDate: today,
      safetyDaysRemaining: s.safetyDaysAllowed,
    };
  }
  const gap = daysBetween(s.lastWorkoutDate, today); // days since last workout
  // gap 1 => consecutive day, no safety used
  // gap >1 => used (gap-1) safety days
  const safetyUsed = Math.max(0, gap - 1);
  if (safetyUsed <= s.safetyDaysRemaining) {
    const next = s.count + 1;
    return {
      ...s,
      count: next,
      longest: Math.max(next, s.longest),
      lastWorkoutDate: today,
      safetyDaysRemaining: Math.min(
        s.safetyDaysAllowed,
        s.safetyDaysRemaining - safetyUsed + 1, // recover one per workout
      ),
    };
  }
  // streak broken
  return {
    ...s,
    count: 1,
    lastWorkoutDate: today,
    safetyDaysRemaining: s.safetyDaysAllowed,
  };
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      customWorkouts: [],
      customExercises: [],
      completedWorkouts: [],
      goals: [],
      streak: initialStreak,
      settings: initialSettings,
      activeSession: null,

      startSession: (workout) =>
        set({
          activeSession: {
            workout: {
              ...workout,
              exercises: workout.exercises.map((e) => ({
                ...e,
                completedSets: 0,
              })),
            },
            startedAt: Date.now(),
          },
        }),

      updateSessionExercise: (exerciseId, patch) => {
        const s = get().activeSession;
        if (!s) return;
        set({
          activeSession: {
            ...s,
            workout: {
              ...s.workout,
              exercises: s.workout.exercises.map((e) =>
                e.id === exerciseId ? { ...e, ...patch } : e,
              ),
            },
          },
        });
      },

      endSession: () => {
        const s = get().activeSession;
        if (!s) return null;
        const completed: CompletedWorkout = {
          id: crypto.randomUUID(),
          workoutId: s.workout.id,
          name: s.workout.name,
          date: new Date().toISOString(),
          durationSec: Math.round((Date.now() - s.startedAt) / 1000),
          exercises: s.workout.exercises,
        };
        const newStreak = computeStreakAfterWorkout(get().streak);
        // Auto-update goals from session weights (max weight lifted per exercise)
        const nowISO = new Date().toISOString();
        const updatedGoals = get().goals.map((g) => {
          const match = s.workout.exercises.find(
            (e) => e.id === g.exerciseId && (e.completedSets ?? 0) > 0 && (e.weight ?? 0) > 0,
          );
          if (!match) return g;
          const w = match.weight ?? 0;
          if (w <= g.currentWeight) return g;
          return {
            ...g,
            currentWeight: w,
            history: [...g.history, { date: nowISO, weight: w }],
          };
        });
        set({
          activeSession: null,
          completedWorkouts: [completed, ...get().completedWorkouts],
          streak: newStreak,
          goals: updatedGoals,
        });
        return completed;
      },

      cancelSession: () => set({ activeSession: null }),

      saveCustomWorkout: (workout) => {
        const exists = get().customWorkouts.some((w) => w.id === workout.id);
        set({
          customWorkouts: exists
            ? get().customWorkouts.map((w) => (w.id === workout.id ? workout : w))
            : [{ ...workout, isCustom: true }, ...get().customWorkouts],
        });
      },
      deleteCustomWorkout: (id) =>
        set({ customWorkouts: get().customWorkouts.filter((w) => w.id !== id) }),

      addCustomExercise: (e) => {
        const ex: Exercise = { ...e, id: `custom-${crypto.randomUUID()}` };
        set({ customExercises: [ex, ...get().customExercises] });
        return ex;
      },
      deleteCustomExercise: (id) =>
        set({ customExercises: get().customExercises.filter((e) => e.id !== id) }),

      addGoal: (g) =>
        set({
          goals: [
            {
              ...g,
              id: crypto.randomUUID(),
              history: [{ date: new Date().toISOString(), weight: g.currentWeight }],
            },
            ...get().goals,
          ],
        }),
      updateGoal: (id, currentWeight) =>
        set({
          goals: get().goals.map((g) =>
            g.id === id
              ? {
                  ...g,
                  currentWeight,
                  history: [
                    ...g.history,
                    { date: new Date().toISOString(), weight: currentWeight },
                  ],
                }
              : g,
          ),
        }),
      deleteGoal: (id) => set({ goals: get().goals.filter((g) => g.id !== id) }),

      updateSettings: (patch) => {
        const next = { ...get().settings, ...patch };
        set({
          settings: next,
          streak: {
            ...get().streak,
            safetyDaysAllowed: next.safetyDaysAllowed,
            safetyDaysRemaining: Math.min(
              get().streak.safetyDaysRemaining,
              next.safetyDaysAllowed,
            ),
          },
        });
      },

      resetAll: () =>
        set({
          customWorkouts: [],
          customExercises: [],
          completedWorkouts: [],
          goals: [],
          streak: initialStreak,
          settings: initialSettings,
          activeSession: null,
        }),
    }),
    { name: "gymplan-store-v1" },
  ),
);
