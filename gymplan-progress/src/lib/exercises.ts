import { Exercise } from "./types";

export const EXERCISES: Exercise[] = [
  // Chest
  { id: "bench-press", name: "Barbell Bench Press", bodyParts: ["Chest"], difficulty: "Medium", equipment: "Barbell", defaultSets: 4, defaultReps: 8 },
  { id: "db-bench", name: "Dumbbell Bench Press", bodyParts: ["Chest"], difficulty: "Easy", equipment: "Dumbbell", defaultSets: 3, defaultReps: 10 },
  { id: "incline-db", name: "Incline Dumbbell Press", bodyParts: ["Chest", "Shoulders"], difficulty: "Medium", equipment: "Dumbbell", defaultSets: 3, defaultReps: 10 },
  { id: "chest-fly", name: "Chest Fly", bodyParts: ["Chest"], difficulty: "Easy", equipment: "Dumbbell", defaultSets: 3, defaultReps: 12 },
  { id: "pushup", name: "Push-up", bodyParts: ["Chest", "Arms"], difficulty: "Easy", equipment: "Bodyweight", defaultSets: 3, defaultReps: 15 },
  { id: "cable-fly", name: "Cable Fly", bodyParts: ["Chest"], difficulty: "Medium", equipment: "Cable", defaultSets: 3, defaultReps: 12 },

  // Back
  { id: "deadlift", name: "Deadlift", bodyParts: ["Back", "Legs"], difficulty: "Hard", equipment: "Barbell", defaultSets: 4, defaultReps: 5 },
  { id: "pullup", name: "Pull-up", bodyParts: ["Back", "Arms"], difficulty: "Hard", equipment: "Bodyweight", defaultSets: 3, defaultReps: 8 },
  { id: "lat-pulldown", name: "Lat Pulldown", bodyParts: ["Back"], difficulty: "Easy", equipment: "Cable", defaultSets: 3, defaultReps: 10 },
  { id: "barbell-row", name: "Barbell Row", bodyParts: ["Back"], difficulty: "Medium", equipment: "Barbell", defaultSets: 4, defaultReps: 8 },
  { id: "seated-row", name: "Seated Cable Row", bodyParts: ["Back"], difficulty: "Easy", equipment: "Cable", defaultSets: 3, defaultReps: 10 },
  { id: "face-pull", name: "Face Pull", bodyParts: ["Back", "Shoulders"], difficulty: "Easy", equipment: "Cable", defaultSets: 3, defaultReps: 15 },

  // Shoulders
  { id: "shoulder-press", name: "Overhead Shoulder Press", bodyParts: ["Shoulders"], difficulty: "Medium", equipment: "Barbell", defaultSets: 4, defaultReps: 8 },
  { id: "db-shoulder", name: "Dumbbell Shoulder Press", bodyParts: ["Shoulders"], difficulty: "Easy", equipment: "Dumbbell", defaultSets: 3, defaultReps: 10 },
  { id: "lateral-raise", name: "Lateral Raise", bodyParts: ["Shoulders"], difficulty: "Easy", equipment: "Dumbbell", defaultSets: 3, defaultReps: 12 },
  { id: "rear-delt-fly", name: "Rear Delt Fly", bodyParts: ["Shoulders"], difficulty: "Easy", equipment: "Dumbbell", defaultSets: 3, defaultReps: 12 },

  // Arms
  { id: "bicep-curl", name: "Dumbbell Bicep Curl", bodyParts: ["Arms"], difficulty: "Easy", equipment: "Dumbbell", defaultSets: 3, defaultReps: 12 },
  { id: "hammer-curl", name: "Hammer Curl", bodyParts: ["Arms"], difficulty: "Easy", equipment: "Dumbbell", defaultSets: 3, defaultReps: 12 },
  { id: "tricep-pushdown", name: "Tricep Pushdown", bodyParts: ["Arms"], difficulty: "Easy", equipment: "Cable", defaultSets: 3, defaultReps: 12 },
  { id: "skull-crusher", name: "Skull Crusher", bodyParts: ["Arms"], difficulty: "Medium", equipment: "Barbell", defaultSets: 3, defaultReps: 10 },
  { id: "preacher-curl", name: "Preacher Curl", bodyParts: ["Arms"], difficulty: "Medium", equipment: "Machine", defaultSets: 3, defaultReps: 10 },

  // Legs
  { id: "squat", name: "Barbell Back Squat", bodyParts: ["Legs"], difficulty: "Hard", equipment: "Barbell", defaultSets: 4, defaultReps: 6 },
  { id: "leg-press", name: "Leg Press", bodyParts: ["Legs"], difficulty: "Medium", equipment: "Machine", defaultSets: 4, defaultReps: 10 },
  { id: "lunges", name: "Walking Lunges", bodyParts: ["Legs"], difficulty: "Easy", equipment: "Dumbbell", defaultSets: 3, defaultReps: 12 },
  { id: "leg-curl", name: "Leg Curl", bodyParts: ["Legs"], difficulty: "Easy", equipment: "Machine", defaultSets: 3, defaultReps: 12 },
  { id: "leg-extension", name: "Leg Extension", bodyParts: ["Legs"], difficulty: "Easy", equipment: "Machine", defaultSets: 3, defaultReps: 12 },
  { id: "calf-raise", name: "Calf Raise", bodyParts: ["Legs"], difficulty: "Easy", equipment: "Machine", defaultSets: 4, defaultReps: 15 },
  { id: "rdl", name: "Romanian Deadlift", bodyParts: ["Legs", "Back"], difficulty: "Medium", equipment: "Barbell", defaultSets: 3, defaultReps: 10 },

  // Core
  { id: "plank", name: "Plank", bodyParts: ["Core"], difficulty: "Easy", equipment: "Bodyweight", defaultSets: 3, defaultReps: 1 },
  { id: "hanging-leg", name: "Hanging Leg Raise", bodyParts: ["Core"], difficulty: "Hard", equipment: "Bodyweight", defaultSets: 3, defaultReps: 10 },
  { id: "crunch", name: "Crunch", bodyParts: ["Core"], difficulty: "Easy", equipment: "Bodyweight", defaultSets: 3, defaultReps: 20 },
  { id: "russian-twist", name: "Russian Twist", bodyParts: ["Core"], difficulty: "Medium", equipment: "Bodyweight", defaultSets: 3, defaultReps: 20 },
];

export const exerciseById = (id: string) => EXERCISES.find((e) => e.id === id);

export interface PresetWorkout {
  key: string;
  name: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estMinutes: number;
  exerciseIds: string[];
}

export const PRESETS: PresetWorkout[] = [
  {
    key: "upper-body",
    name: "Upper Body",
    description: "Chest, back, shoulders & arms in one session.",
    difficulty: "Medium",
    estMinutes: 50,
    exerciseIds: ["bench-press", "barbell-row", "shoulder-press", "lat-pulldown", "bicep-curl", "tricep-pushdown"],
  },
  {
    key: "lower-body",
    name: "Lower Body",
    description: "Quads, hamstrings & calves.",
    difficulty: "Medium",
    estMinutes: 45,
    exerciseIds: ["squat", "rdl", "leg-press", "leg-curl", "calf-raise"],
  },
  {
    key: "push",
    name: "Push Day",
    description: "Chest, shoulders, triceps.",
    difficulty: "Medium",
    estMinutes: 50,
    exerciseIds: ["bench-press", "incline-db", "shoulder-press", "lateral-raise", "tricep-pushdown", "skull-crusher"],
  },
  {
    key: "pull",
    name: "Pull Day",
    description: "Back & biceps.",
    difficulty: "Medium",
    estMinutes: 45,
    exerciseIds: ["pullup", "barbell-row", "lat-pulldown", "face-pull", "bicep-curl", "hammer-curl"],
  },
  {
    key: "legs",
    name: "Leg Day",
    description: "Heavy lower body session.",
    difficulty: "Hard",
    estMinutes: 55,
    exerciseIds: ["squat", "rdl", "lunges", "leg-extension", "leg-curl", "calf-raise"],
  },
  {
    key: "chest",
    name: "Chest Focus",
    description: "Hit every angle of the chest.",
    difficulty: "Easy",
    estMinutes: 35,
    exerciseIds: ["db-bench", "incline-db", "chest-fly", "pushup"],
  },
  {
    key: "back",
    name: "Back Focus",
    description: "Build a wider, stronger back.",
    difficulty: "Medium",
    estMinutes: 40,
    exerciseIds: ["deadlift", "pullup", "barbell-row", "seated-row", "face-pull"],
  },
  {
    key: "shoulders-arms",
    name: "Shoulders & Arms",
    description: "Pump-focused arm & shoulder day.",
    difficulty: "Easy",
    estMinutes: 40,
    exerciseIds: ["db-shoulder", "lateral-raise", "rear-delt-fly", "bicep-curl", "tricep-pushdown", "hammer-curl"],
  },
];
