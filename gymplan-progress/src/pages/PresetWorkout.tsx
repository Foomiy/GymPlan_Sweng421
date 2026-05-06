import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Trash2, Save } from "lucide-react";
import { PRESETS, exerciseById } from "@/lib/exercises";
import { Workout, WorkoutExercise, BodyPart, Difficulty, Equipment } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AddExerciseSheet from "@/components/AddExerciseSheet";

const API_BASE_URL = "http://localhost:8081";

type BackendExercise = {
  name: string;
  bodyPart: string;
  equipment: string;
  difficulty: string;
  sets: number;
  reps: number;
};

type BackendWorkout = {
  name: string;
  description?: string;
  exercises: BackendExercise[];
};

const normalizeDifficulty = (difficulty: string): Difficulty => {
  const value = difficulty.toLowerCase();

  if (value === "easy" || value === "beginner") {
    return "Easy";
  }

  if (value === "hard" || value === "advanced") {
    return "Hard";
  }

  return "Medium";
};

const normalizeEquipment = (equipment: string): Equipment => {
  const value = equipment.toLowerCase();

  if (value.includes("bodyweight")) return "Bodyweight";
  if (value.includes("dumbbell")) return "Dumbbell";
  if (value.includes("barbell")) return "Barbell";
  if (value.includes("cable")) return "Cable";

  return "Machine";
};

const normalizeBodyPart = (bodyPart: string): BodyPart => {
  const value = bodyPart.toLowerCase();

  if (value.includes("chest")) return "Chest";
  if (value.includes("back")) return "Back";
  if (value.includes("shoulder")) return "Shoulders";
  if (value.includes("arm") || value.includes("bicep") || value.includes("tricep")) return "Arms";
  if (
    value.includes("leg") ||
    value.includes("quad") ||
    value.includes("hamstring") ||
    value.includes("glute") ||
    value.includes("calf")
  ) {
    return "Legs";
  }

  return "Core";
};

const toExerciseId = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const mapBackendWorkout = (backendWorkout: BackendWorkout, presetKey: string): Workout => {
  return {
    id: crypto.randomUUID(),
    name: backendWorkout.name,
    presetKey,
    exercises: backendWorkout.exercises.map((exercise): WorkoutExercise => {
      const sets = exercise.sets || 3;
      const reps = exercise.reps || 10;

      return {
        id: toExerciseId(exercise.name),
        name: exercise.name,
        bodyParts: [normalizeBodyPart(exercise.bodyPart)],
        difficulty: normalizeDifficulty(exercise.difficulty),
        equipment: normalizeEquipment(exercise.equipment),
        defaultSets: sets,
        defaultReps: reps,
        sets,
        reps,
      };
    }),
  };
};

const buildFromPreset = (key: string): Workout | null => {
  const preset = PRESETS.find((p) => p.key === key);
  if (!preset) return null;
  return {
    id: crypto.randomUUID(),
    name: preset.name,
    presetKey: preset.key,
    exercises: preset.exerciseIds
      .map(exerciseById)
      .filter((e): e is NonNullable<typeof e> => !!e)
      .map((e) => ({ ...e, sets: e.defaultSets, reps: e.defaultReps })),
  };
};

const PresetWorkout = () => {
  const { presetKey } = useParams<{ presetKey: string }>();
  const navigate = useNavigate();
  const startSession = useAppStore((s) => s.startSession);
  const saveCustomWorkout = useAppStore((s) => s.saveCustomWorkout);
  const initial = useMemo(() => buildFromPreset(presetKey || ""), [presetKey]);

  const [workout, setWorkout] = useState<Workout | null>(initial);
  const [customizing, setCustomizing] = useState(false);
  const [loadingBackendWorkout, setLoadingBackendWorkout] = useState(false);

  useEffect(() => {
    if (!presetKey) return;

    const loadWorkoutFromBackend = async () => {
      try {
        setLoadingBackendWorkout(true);

        const response = await fetch(`${API_BASE_URL}/api/workouts/${presetKey}`);

        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        const backendWorkout: BackendWorkout = await response.json();
        setWorkout(mapBackendWorkout(backendWorkout, presetKey));
      } catch (error) {
        console.error(error);
        toast.error("Could not load backend workout. Using local preset instead.");
        setWorkout(buildFromPreset(presetKey));
      } finally {
        setLoadingBackendWorkout(false);
      }
    };

    loadWorkoutFromBackend();
  }, [presetKey]);

  if (!workout) {
    return (
      <div className="space-y-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <p>Workout not found.</p>
      </div>
    );
  }

  const updateExercise = (id: string, patch: Partial<WorkoutExercise>) => {
    setWorkout((w) =>
      w
        ? { ...w, exercises: w.exercises.map((e) => (e.id === id ? { ...e, ...patch } : e)) }
        : w,
    );
  };

  const removeExercise = (id: string) =>
    setWorkout((w) => (w ? { ...w, exercises: w.exercises.filter((e) => e.id !== id) } : w));

  const handleStart = () => {
    if (!workout.exercises.length) {
      toast.error("Add at least one exercise");
      return;
    }
    startSession(workout);
    navigate("/session");
  };

  const handleSave = () => {
    saveCustomWorkout({ ...workout, isCustom: true });
    toast.success("Saved to Library");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Workouts
        </Link>
        <Button
          size="sm"
          variant={customizing ? "default" : "outline"}
          onClick={() => setCustomizing((c) => !c)}
        >
          {customizing ? "Done" : "Customize"}
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold">{workout.name}</h1>
        <p className="text-sm text-muted-foreground">
          {loadingBackendWorkout ? "Loading from backend..." : `${workout.exercises.length} exercises`}
        </p>
      </div>

      <ul className="space-y-2">
        {workout.exercises.map((e) => (
          <li
            key={e.id}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
          >
            <div className="flex-1">
              <p className="font-medium">{e.name}</p>
              <p className="text-xs text-muted-foreground">
                {e.bodyParts.join(", ")} · {e.equipment}
              </p>
            </div>
            {customizing ? (
              <>
                <input
                  type="number"
                  min={1}
                  value={e.sets}
                  onChange={(ev) => updateExercise(e.id, { sets: +ev.target.value })}
                  className="w-12 rounded-md border border-input bg-background px-2 py-1 text-center text-sm"
                  aria-label="sets"
                />
                <span className="text-xs text-muted-foreground">×</span>
                <input
                  type="number"
                  min={1}
                  value={e.reps}
                  onChange={(ev) => updateExercise(e.id, { reps: +ev.target.value })}
                  className="w-12 rounded-md border border-input bg-background px-2 py-1 text-center text-sm"
                  aria-label="reps"
                />
                <button
                  onClick={() => removeExercise(e.id)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            ) : (
              <span className="text-sm font-semibold text-primary">
                {e.sets} × {e.reps}
              </span>
            )}
          </li>
        ))}
      </ul>

      {customizing && (
        <AddExerciseSheet
          excludeIds={workout.exercises.map((e) => e.id)}
          onAdd={(ex) =>
            setWorkout({
              ...workout,
              exercises: [
                ...workout.exercises,
                { ...ex, sets: ex.defaultSets, reps: ex.defaultReps },
              ],
            })
          }
        />
      )}

      <div className="sticky bottom-24 flex gap-2">
        <Button onClick={handleSave} variant="outline" className="flex-1">
          <Save className="mr-2 h-4 w-4" /> Save
        </Button>
        <Button onClick={handleStart} className="flex-1 shadow-neon">
          <Play className="mr-2 h-4 w-4 fill-current" /> Start
        </Button>
      </div>
    </div>
  );
};

export default PresetWorkout;