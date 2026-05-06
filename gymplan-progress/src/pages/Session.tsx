import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Pause, Play, RotateCcw, X, Bell, BellOff } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
};

const RestTimer = ({
  seconds,
  onDone,
}: {
  seconds: number;
  onDone: () => void;
}) => {
  const [remaining, setRemaining] = useState(seconds);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          onDone();
          return 0;
        }

        return r - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [paused, onDone]);

  const pct = ((seconds - remaining) / seconds) * 100;

  return (
    <div className="rounded-2xl border border-primary/30 bg-card p-4 shadow-neon">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-primary">Rest</p>
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setPaused((p) => !p)}
            aria-label="pause"
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
          <Button size="icon" variant="ghost" onClick={onDone} aria-label="skip rest">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="mt-2 text-4xl font-bold tabular-nums">{fmt(remaining)}</p>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
        <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const Session = () => {
  const navigate = useNavigate();
  const session = useAppStore((s) => s.activeSession);
  const settings = useAppStore((s) => s.settings);
  const updateSessionExercise = useAppStore((s) => s.updateSessionExercise);
  const endSession = useAppStore((s) => s.endSession);
  const cancelSession = useAppStore((s) => s.cancelSession);
  const updateSettings = useAppStore((s) => s.updateSettings);

  const [idx, setIdx] = useState(0);
  const [resting, setResting] = useState(false);
  const startedAtRef = useRef<number>(session?.startedAt ?? Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!session) {
      navigate("/");
      return;
    }

    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAtRef.current) / 1000));
    }, 1000);

    return () => clearInterval(id);
  }, [session, navigate]);

  if (!session) return null;

  const exercises = session.workout.exercises;
  const current = exercises[idx];

  if (!current) return null;

  const completedSets = current.completedSets ?? 0;
  const isLast = idx === exercises.length - 1;

  const completeSet = () => {
    const next = completedSets + 1;

    updateSessionExercise(current.id, { completedSets: next });

    if (next >= current.sets) {
      if (isLast) {
        toast.success("All exercises complete — finish to save!");
      } else if (settings.notificationsEnabled) {
        setResting(true);
      } else {
        setIdx((i) => i + 1);
      }
    } else if (settings.notificationsEnabled) {
      setResting(true);
    }
  };

  const finishRest = () => {
    setResting(false);

    if (completedSets >= current.sets && !isLast) {
      setIdx((i) => i + 1);
    }
  };

  const finish = async () => {
    const completedSession = endSession();

    if (!completedSession) {
      navigate("/library");
      return;
    }

    try {
      await fetch("http://localhost:8081/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workoutName: completedSession.name,
          exercises: completedSession.exercises.map((exercise) => ({
            name: exercise.name,
            bodyPart: exercise.bodyParts[0],
            equipment: exercise.equipment,
            difficulty: exercise.difficulty,
            sets: exercise.sets,
            reps: exercise.reps,
            completedSets: exercise.completedSets ?? 0,
            weight: exercise.weight ?? 0,
            notes: exercise.notes ?? "",
          })),
        }),
      });

      toast.success("Workout saved to backend · streak updated");
    } catch (error) {
      console.error(error);
      toast.error("Workout saved locally, but backend save failed");
    }

    navigate("/library");
  };

  const cancel = () => {
    cancelSession();
    navigate("/");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={cancel}>
          <X className="mr-1 h-4 w-4" /> Cancel
        </Button>

        <p className="text-sm font-mono tabular-nums text-muted-foreground">
          {fmt(elapsed)}
        </p>

        <Button
          size="icon"
          variant="ghost"
          onClick={() =>
            updateSettings({ notificationsEnabled: !settings.notificationsEnabled })
          }
          aria-label="toggle notifications"
        >
          {settings.notificationsEnabled ? (
            <Bell className="h-4 w-4" />
          ) : (
            <BellOff className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {idx + 1} of {exercises.length}
        </p>
        <h1 className="mt-1 text-2xl font-bold">{current.name}</h1>
        <p className="text-sm text-muted-foreground">
          {current.bodyParts.join(", ")} · {current.equipment}
        </p>
      </div>

      {resting ? (
        <RestTimer seconds={settings.restSeconds} onDone={finishRest} />
      ) : (
        <>
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Sets</p>
                <p className="text-2xl font-bold">
                  {completedSets}
                  <span className="text-sm text-muted-foreground"> / {current.sets}</span>
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Reps</p>
                <input
                  type="number"
                  value={current.reps}
                  onChange={(e) =>
                    updateSessionExercise(current.id, { reps: +e.target.value })
                  }
                  className="w-full rounded-md border border-input bg-background px-2 py-1 text-2xl font-bold"
                />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Weight ({settings.unit})</p>
                <input
                  type="number"
                  value={current.weight ?? ""}
                  onChange={(e) =>
                    updateSessionExercise(current.id, { weight: +e.target.value })
                  }
                  placeholder="0"
                  className="w-full rounded-md border border-input bg-background px-2 py-1 text-2xl font-bold"
                />
              </div>
            </div>

            <textarea
              placeholder="Notes for this exercise…"
              value={current.notes ?? ""}
              onChange={(e) => updateSessionExercise(current.id, { notes: e.target.value })}
              className="mt-3 w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm"
              rows={2}
            />
          </div>

          <Button onClick={completeSet} size="lg" className="w-full shadow-neon">
            <Check className="mr-2 h-5 w-5" /> Complete set
          </Button>
        </>
      )}

      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={idx === 0}
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
        >
          ← Prev
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => updateSessionExercise(current.id, { completedSets: 0 })}
          aria-label="reset sets"
        >
          <RotateCcw className="h-3 w-3" />
        </Button>

        {isLast ? (
          <Button size="sm" onClick={finish}>
            Finish ✓
          </Button>
        ) : (
          <Button size="sm" variant="outline" onClick={() => setIdx((i) => i + 1)}>
            Next →
          </Button>
        )}
      </div>

      <ul className="mt-4 space-y-1.5 pt-4">
        {exercises.map((e, i) => (
          <li
            key={e.id}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
              i === idx ? "bg-secondary" : ""
            }`}
          >
            <span className={i === idx ? "font-semibold" : "text-muted-foreground"}>
              {i + 1}. {e.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {e.completedSets ?? 0}/{e.sets}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Session;