
# GymPlan — Frontend Plan

A clean, mobile-first fitness app for starting, customizing, and tracking workouts. Built around the structure in your project doc and UML (Workouts, Exercises, Goals, Streaks, Sessions). Data persists locally in the browser for now; accounts can be added later without throwing away the UI.

## Look & feel

- Dark theme, energetic. Near-black background (`#0B0B0E`), elevated surface cards, subtle borders.
- Neon-lime accent (`#C7F751`) for primary actions, progress bars, streak flame.
- Bold display headings, rounded cards, generous spacing, no clutter.
- Mobile-first layout, max-width container so it also looks intentional on desktop.

## Navigation

Persistent **bottom tab bar** with 4 tabs:

1. **Workouts** (default)
2. **Progress**
3. **Library** (saved + custom workouts)
4. **Profile** (settings, notification toggle, streak safety days)

A slim **streak banner** sits at the top of every screen showing current streak, flame icon, and "rest days remaining" indicator.

```text
+--------------------------------------+
| 🔥 12-day streak · 2 rest days left  |  <- streak banner
+--------------------------------------+
|                                      |
|           Tab content                |
|                                      |
+--------------------------------------+
| Workouts | Progress | Library | Me   |  <- bottom tabs
+--------------------------------------+
```

## Screens & flows

### 1. Workouts tab (home)

- "Start a workout" hero card with two big actions:
  - **Quick start** → opens preset picker.
  - **Build your own** → opens filter/custom flow.
- **Preset workouts** horizontal cards: Upper Body, Lower Body, Push, Pull, Legs, Chest, Back, Shoulders & Arms. Each shows estimated time, exercise count, difficulty.
- Tapping a preset → **Workout preview** screen listing exercises (name, sets × reps). Buttons: *Start*, *Customize* (add/remove/swap exercises).

### 2. Filter / Build flow

- Multi-select chips for **Body part** (Chest, Back, Shoulders, Arms, Legs, Core).
- Single-select **Difficulty** (Easy / Medium / Hard).
- Optional **Equipment** chips (Bodyweight, Dumbbell, Barbell, Machine).
- "Generate workout" button produces a tailored list (e.g. Chest + Shoulders + Medium → Bench Press, Shoulder Press, Chest Fly, Lateral Raise).
- If filters conflict and produce no results, show a clear empty-state suggesting which filter to relax (NFR3).
- User can also tap **Add exercise** to append from the exercise library, or save the result as a custom workout.

### 3. Active workout screen

- One exercise focused at a time with sets/reps/weight, notes field, and "Mark set complete" buttons.
- **Rest timer** auto-starts between sets with a circular countdown; user can opt out via Profile.
- Top bar shows total elapsed workout time.
- "Finish workout" → summary screen → updates streak, prompts to save to Library.

### 4. Progress tab

- List of strength goals (e.g. Squat 225 lb, Bench 185 lb).
- Each goal shows a horizontal progress bar with current / target and percentage (e.g. 112.5 / 225 → 50%).
- "+ Add goal" opens a sheet to set exercise, target weight, current weight.
- Tap a goal to update current weight; bar animates to new fill.

### 5. Library tab

- Tabs inside: **Saved** (completed workouts) and **Custom** (user-built templates).
- Each entry: name, date, exercise count, "Repeat workout" action.

### 6. Profile tab

- App name, streak summary.
- Toggle: workout notifications/timers.
- Setting: streak safety days (1 or 2).
- Reset data button.

## Streak rules

- Increments once per day a workout is finished.
- Up to 2 "safety" rest days per week (configurable 1 or 2) — missing a day uses a safety day instead of resetting.
- Banner shows remaining safety days; turns warning color when only 0–1 left.

## Data model (browser localStorage)

- `exercises` — seeded catalog with `name, bodyParts[], difficulty, equipment, defaultSets, defaultReps`.
- `presetWorkouts` — Upper Body, Lower Body, Push, Pull, Legs, Chest, Back, Shoulders & Arms.
- `savedWorkouts` — completed sessions with date.
- `customWorkouts` — user-built templates.
- `goals` — `{ exercise, targetWeight, currentWeight, history[] }`.
- `streak` — `{ count, lastWorkoutDate, safetyDaysRemaining, safetyDaysAllowed }`.
- `settings` — `{ notificationsEnabled, safetyDaysAllowed }`.

Designed so swapping the storage layer for Lovable Cloud + accounts later is a single module change.

## Technical notes

- React + Vite + Tailwind + shadcn/ui (already set up).
- Add HSL design tokens in `index.css` for the dark/neon palette; expose via `tailwind.config.ts`.
- Routes: `/` (Workouts), `/workouts/:presetId`, `/workouts/build`, `/session/:id`, `/progress`, `/library`, `/profile`. Bottom tab bar in a shared layout wrapper; streak banner in same layout.
- State: lightweight Zustand store (or React context) backed by `localStorage`; no backend yet.
- Components: `BottomTabBar`, `StreakBanner`, `PresetCard`, `ExerciseRow`, `RestTimer`, `GoalProgressBar`, `FilterChips`, `EmptyState`.
- Mobile-first; centered max-width on desktop with phone-shaped frame feel.

## Out of scope (for now)

- Accounts/sync across devices (revisit when you're ready to add Lovable Cloud).
- Push notifications outside the browser.
- Social/sharing features.
