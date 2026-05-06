import { useMemo, useState } from "react";
import { ChevronRight, ArrowLeft, Plus, Dumbbell } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EXERCISES } from "@/lib/exercises";
import { useAppStore } from "@/lib/store";
import {
  BodyPart,
  Difficulty,
  Equipment,
  Exercise,
} from "@/lib/types";
import { toast } from "sonner";

const BODY_PARTS: BodyPart[] = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core"];
const EQUIPMENT: Equipment[] = ["Bodyweight", "Dumbbell", "Barbell", "Machine", "Cable"];
const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

interface Props {
  excludeIds?: string[];
  onAdd: (exercise: Exercise) => void;
  trigger?: React.ReactNode;
}

const AddExerciseSheet = ({ excludeIds = [], onAdd, trigger }: Props) => {
  const customExercises = useAppStore((s) => s.customExercises);
  const addCustomExercise = useAppStore((s) => s.addCustomExercise);

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<BodyPart | null>(null);
  const [customOpen, setCustomOpen] = useState(false);

  const allExercises = useMemo(
    () => [...customExercises, ...EXERCISES],
    [customExercises],
  );

  const inCategory = useMemo(() => {
    if (!category) return [];
    return allExercises.filter(
      (e) => e.bodyParts.includes(category) && !excludeIds.includes(e.id),
    );
  }, [allExercises, category, excludeIds]);

  const handlePick = (ex: Exercise) => {
    onAdd(ex);
    setOpen(false);
    setCategory(null);
  };

  // custom form state
  const [name, setName] = useState("");
  const [muscle, setMuscle] = useState<BodyPart>("Chest");
  const [equipment, setEquipment] = useState<Equipment>("Dumbbell");
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);

  const resetCustomForm = () => {
    setName("");
    setMuscle("Chest");
    setEquipment("Dumbbell");
    setDifficulty("Easy");
    setSets(3);
    setReps(10);
  };

  const handleCreateCustom = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    const ex = addCustomExercise({
      name: name.trim(),
      bodyParts: [muscle],
      equipment,
      difficulty,
      defaultSets: sets,
      defaultReps: reps,
    });
    toast.success("Custom exercise created");
    resetCustomForm();
    setCustomOpen(false);
    onAdd(ex);
    setOpen(false);
    setCategory(null);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setCategory(null);
      }}
    >
      <SheetTrigger asChild>
        {trigger ?? (
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add exercise
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {category && (
              <button
                onClick={() => setCategory(null)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            {category ? category : "Add exercise"}
          </SheetTitle>
        </SheetHeader>

        {!category ? (
          <div className="mt-4 space-y-2">
            {BODY_PARTS.map((p) => {
              const count = allExercises.filter(
                (e) => e.bodyParts.includes(p) && !excludeIds.includes(e.id),
              ).length;
              return (
                <button
                  key={p}
                  onClick={() => setCategory(p)}
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Dumbbell className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">{p}</p>
                      <p className="text-xs text-muted-foreground">{count} exercises</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              );
            })}

            <Dialog open={customOpen} onOpenChange={setCustomOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="mt-3 w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add custom exercise
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New custom exercise</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="ex-name">Name</Label>
                    <Input
                      id="ex-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Cable crossover"
                    />
                  </div>
                  <div>
                    <Label>Muscle group</Label>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {BODY_PARTS.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setMuscle(p)}
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${
                            muscle === p
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-card"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Equipment</Label>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {EQUIPMENT.map((eq) => (
                        <button
                          key={eq}
                          type="button"
                          onClick={() => setEquipment(eq)}
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${
                            equipment === eq
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-card"
                          }`}
                        >
                          {eq}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Difficulty</Label>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {DIFFICULTIES.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDifficulty(d)}
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${
                            difficulty === d
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-card"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="ex-sets">Default sets</Label>
                      <Input
                        id="ex-sets"
                        type="number"
                        min={1}
                        value={sets}
                        onChange={(e) => setSets(Math.max(1, +e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ex-reps">Default reps</Label>
                      <Input
                        id="ex-reps"
                        type="number"
                        min={1}
                        value={reps}
                        onChange={(e) => setReps(Math.max(1, +e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCustomOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateCustom}>Create & add</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {inCategory.length === 0 && (
              <li className="rounded-lg border border-border bg-card p-4 text-center text-sm text-muted-foreground">
                No more exercises here.
              </li>
            )}
            {inCategory.map((ex) => (
              <li key={ex.id}>
                <button
                  onClick={() => handlePick(ex)}
                  className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/40"
                >
                  <div>
                    <p className="font-medium">
                      {ex.name}
                      {ex.id.startsWith("custom-") && (
                        <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
                          Custom
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {ex.equipment} · {ex.difficulty}
                    </p>
                  </div>
                  <Plus className="h-4 w-4 text-primary" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AddExerciseSheet;
