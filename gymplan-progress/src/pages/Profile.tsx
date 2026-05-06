import { Bell, BellOff, Flame, RotateCcw, ShieldCheck } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Profile = () => {
  const settings = useAppStore((s) => s.settings);
  const streak = useAppStore((s) => s.streak);
  const completed = useAppStore((s) => s.completedWorkouts);
  const updateSettings = useAppStore((s) => s.updateSettings);
  const resetAll = useAppStore((s) => s.resetAll);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">App settings & your stats.</p>
      </div>

      <section className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-border bg-card p-3 text-center">
          <Flame className="mx-auto h-5 w-5 text-primary" />
          <p className="mt-1 text-xl font-bold">{streak.count}</p>
          <p className="text-xs text-muted-foreground">Streak</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-3 text-center">
          <ShieldCheck className="mx-auto h-5 w-5 text-primary" />
          <p className="mt-1 text-xl font-bold">{streak.longest}</p>
          <p className="text-xs text-muted-foreground">Longest</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-3 text-center">
          <Bell className="mx-auto h-5 w-5 text-primary" />
          <p className="mt-1 text-xl font-bold">{completed.length}</p>
          <p className="text-xs text-muted-foreground">Workouts</p>
        </div>
      </section>

      <section className="space-y-2 rounded-2xl border border-border bg-card p-4">
        <h2 className="font-semibold">Workout settings</h2>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            {settings.notificationsEnabled ? (
              <Bell className="h-4 w-4 text-primary" />
            ) : (
              <BellOff className="h-4 w-4 text-muted-foreground" />
            )}
            <Label htmlFor="notif" className="cursor-pointer">
              Rest timers & notifications
            </Label>
          </div>
          <Switch
            id="notif"
            checked={settings.notificationsEnabled}
            onCheckedChange={(v) => updateSettings({ notificationsEnabled: v })}
          />
        </div>
        <div className="flex items-center justify-between py-2">
          <Label className="cursor-pointer">Streak safety days</Label>
          <div className="flex gap-1">
            {[1, 2].map((n) => (
              <button
                key={n}
                onClick={() => updateSettings({ safetyDaysAllowed: n as 1 | 2 })}
                className={`rounded-md px-3 py-1 text-sm font-medium ${
                  settings.safetyDaysAllowed === n
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2 py-2">
          <div className="flex items-center justify-between">
            <Label>Rest timer</Label>
            <span className="text-sm font-semibold tabular-nums text-primary">
              {settings.restSeconds}s
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {[30, 45, 60, 75, 90, 120, 180].map((n) => (
              <button
                key={n}
                onClick={() => updateSettings({ restSeconds: n })}
                className={`rounded-md px-3 py-1 text-sm font-medium ${
                  settings.restSeconds === n
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {n}s
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <Label>Weight unit</Label>
          <div className="flex gap-1">
            {(["lb", "kg"] as const).map((u) => (
              <button
                key={u}
                onClick={() => updateSettings({ unit: u })}
                className={`rounded-md px-3 py-1 text-sm font-medium ${
                  settings.unit === u
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4">
        <h2 className="mb-2 font-semibold">About GymPlan</h2>
        <p className="text-sm text-muted-foreground">
          GymPlan is a beginner-friendly gym companion. Pick a routine, customize it, and
          track real progress without the clutter.
        </p>
      </section>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="w-full text-destructive">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset all data
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset everything?</AlertDialogTitle>
            <AlertDialogDescription>
              This will erase your streak, goals, custom workouts, and history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                resetAll();
                toast.success("All data cleared");
              }}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Profile;
