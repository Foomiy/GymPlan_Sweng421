import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EXERCISES } from "@/lib/exercises";
import { BodyPart, Difficulty, Equipment, Workout } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";
import AddExerciseSheet from "@/components/AddExerciseSheet";
import { Plus, Trash2 } from "lucide-react";

const BODY_PARTS: BodyPart[] = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core"];
const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];
const EQUIPMENT: Equipment[] = ["Bodyweight", "Dumbbell", "Barbell", "Machine", "Cable"];

const Chip = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-card text-foreground hover:border-primary/40",
    )}
  >
    {children}
  </button>
);

const BuildWorkout = () => {
  const navigate = useNavigate();
  const startSession = useAppStore((s) => s.startSession);
  const saveCustomWorkout = useAppStore((s) => s.saveCustomWorkout);

  const [parts, setParts] = useState<BodyPart[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [generated, setGenerated] = useState<Workout | null>(null);

  const togglePart = (p: BodyPart) =>
    setParts((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]));
  const toggleEquip = (e: Equipment) =>
    setEquipment((s) => (s.includes(e) ? s.filter((x) => x !== e) : [...s, e]));

  const matches = useMemo(() => {
    return EXERCISES.filter((e) => {
      if (parts.length && !e.bodyParts.some((bp) => parts.includes(bp))) return false;
      if (difficulty && e.difficulty !== difficulty) return false;
      if (equipment.length && !equipment.includes(e.equipment)) return false;
      return true;
    });
  }, [parts, difficulty, equipment]);

  const generate = () => {
    if (!matches.length) {
      toast.error("No exercises match — try removing a filter");
      setGenerated(null);
      return;
    }
    // Pick up to 6, prefer one per body part if specified
    const picks: typeof matches = [];
    if (parts.length) {
      for (const p of parts) {
        const candidate = matches.find((m) => m.bodyParts.includes(p) && !picks.includes(m));
        if (candidate) picks.push(candidate);
      }
    }
    for (const ex of matches) {
      if (picks.length >= 6) break;
      if (!picks.includes(ex)) picks.push(ex);
    }
    setGenerated({
      id: crypto.randomUUID(),
      name: parts.length ? `${parts.join(" & ")} Workout` : "Custom Workout",
      isCustom: true,
      exercises: picks.map((e) => ({ ...e, sets: e.defaultSets, reps: e.defaultReps })),
    });
  };

  const start = () => {
    if (!generated) return;
    startSession(generated);
    navigate("/session");
  };

  const save = () => {
    if (!generated) return;
    saveCustomWorkout(generated);
    toast.success("Saved to Library");
  };

  const tooFewMatches = (parts.length + (difficulty ? 1 : 0) + equipment.length) >= 3 && matches.length === 0;

  return (
    <div className="space-y-5">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Workouts
      </Link>

      <div>
        <h1 className="text-2xl font-bold">Build a workout</h1>
        <p className="text-sm text-muted-foreground">Filter and we'll generate a routine.</p>
      </div>

      <section>
        <p className="mb-2 text-sm font-semibold">Body parts</p>
        <div className="flex flex-wrap gap-2">
          {BODY_PARTS.map((p) => (
            <Chip key={p} active={parts.includes(p)} onClick={() => togglePart(p)}>
              {p}
            </Chip>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-2 text-sm font-semibold">Difficulty</p>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => (
            <Chip
              key={d}
              active={difficulty === d}
              onClick={() => setDifficulty((cur) => (cur === d ? null : d))}
            >
              {d}
            </Chip>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-2 text-sm font-semibold">Equipment</p>
        <div className="flex flex-wrap gap-2">
          {EQUIPMENT.map((e) => (
            <Chip key={e} active={equipment.includes(e)} onClick={() => toggleEquip(e)}>
              {e}
            </Chip>
          ))}
        </div>
      </section>

      {tooFewMatches && (
        <div className="flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/10 p-3 text-sm text-warning">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>These filters don't match any exercises — try relaxing one.</span>
        </div>
      )}

      <Button onClick={generate} className="w-full shadow-neon" size="lg">
        <Sparkles className="mr-2 h-4 w-4" /> Generate workout
      </Button>

      {generated && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">{generated.name}</h2>
          <ul className="space-y-2">
            {generated.exercises.map((e) => (
              <li
                key={e.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-3"
              >
                <div>
                  <p className="font-medium">{e.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {e.bodyParts.join(", ")} · {e.equipment}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-primary">
                    {e.sets} × {e.reps}
                  </span>
                  <button
                    onClick={() =>
                      setGenerated({
                        ...generated,
                        exercises: generated.exercises.filter((x) => x.id !== e.id),
                      })
                    }
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <AddExerciseSheet
            excludeIds={generated.exercises.map((e) => e.id)}
            onAdd={(ex) =>
              setGenerated({
                ...generated,
                exercises: [
                  ...generated.exercises,
                  { ...ex, sets: ex.defaultSets, reps: ex.defaultReps },
                ],
              })
            }
            trigger={
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add or create exercise
              </Button>
            }
          />

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={save}>
              Save
            </Button>
            <Button className="flex-1 shadow-neon" onClick={start}>
              Start workout
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default BuildWorkout;
