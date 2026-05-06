import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, Dumbbell, Play, Trash2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const API_BASE_URL = "http://localhost:8081";

type BackendExercise = {
  name: string;
  bodyPart: string;
  equipment: string;
  difficulty: string;
  sets: number;
  reps: number;
};

type BackendSession = {
  id: string;
  workoutName: string;
  completedAt: string;
  exercises: BackendExercise[];
};

const Library = () => {
  const navigate = useNavigate();
  const customs = useAppStore((s) => s.customWorkouts);
  const startSession = useAppStore((s) => s.startSession);
  const deleteCustom = useAppStore((s) => s.deleteCustomWorkout);

  const [tab, setTab] = useState("custom");
  const [backendCompleted, setBackendCompleted] = useState<BackendSession[]>([]);

  useEffect(() => {
    const loadCompletedSessions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/sessions`);

        if (!response.ok) {
          throw new Error("Failed to load completed sessions");
        }

        const data: BackendSession[] = await response.json();
        setBackendCompleted(data);
      } catch (error) {
        console.error("Could not load completed sessions from backend:", error);
      }
    };

    loadCompletedSessions();
  }, []);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Library</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your custom routines and completed workouts.
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="custom">Custom ({customs.length})</TabsTrigger>
          <TabsTrigger value="history">
            History ({backendCompleted.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="custom" className="mt-4 space-y-3">
          {customs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
              <Dumbbell className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="font-medium">No custom workouts</p>
              <p className="mb-3 text-sm text-muted-foreground">
                Build one from scratch or save a customized preset.
              </p>
              <Button asChild>
                <Link to="/workouts/build">Build one</Link>
              </Button>
            </div>
          ) : (
            customs.map((w) => (
              <div
                key={w.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <div className="flex-1">
                  <p className="font-semibold">{w.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {w.exercises.length} exercises
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteCustom(w.id)}
                  aria-label="delete"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    startSession(w);
                    navigate("/session");
                  }}
                >
                  <Play className="mr-1 h-3 w-3 fill-current" /> Start
                </Button>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-4 space-y-3">
          {backendCompleted.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
              <CalendarDays className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="font-medium">No workouts logged yet</p>
              <p className="text-sm text-muted-foreground">
                Finish a workout to see it here.
              </p>
            </div>
          ) : (
            backendCompleted.map((w) => (
              <div
                key={w.id}
                className="rounded-2xl border border-border bg-card p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{w.workoutName}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(w.completedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {" · "}
                      {w.exercises.length} exercises
                    </p>
                  </div>
                  <span className="rounded-full bg-success/15 px-2 py-1 text-xs font-medium text-success">
                    Done
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {w.exercises.map((e) => e.name).join(" · ")}
                </p>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Library;