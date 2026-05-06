package Main;

import Builder.CustomWorkout;
import Builder.WorkoutBuilder;
import Decorator.*;
import Observer.*;
import Scheduler.*;
import Filter.*;

import java.util.List;

public class Main {
    public static void main(String[] args) {

        // =========================
        // 1. Create User + Goal
        // =========================
        User user = new User("Ben");
        Goal goal = new Goal(185, 135); // target lift vs current

        user.addGoal(goal);

        // =========================
        // 2. Build Workout
        // =========================
        WorkoutBuilder builder = new CustomWorkout();
        DefaultWorkout defaultWorkout = new DefaultWorkout(builder);

        Workout workout = defaultWorkout.buildChest();

        System.out.println(workout);

        // =========================
        // 3. Apply Filter
        // =========================
        BodyPartFilter filter = new BodyPartFilter("Chest");
        List<Exercise> chestExercises = filter.filter(workout.getExercises());

        System.out.println("\nFiltered Exercises (Chest):");
        for (Exercise e : chestExercises) {
            System.out.println(e);
        }

        // =========================
        // 4. Setup Observer + Session
        // =========================
        WorkoutSession session = new WorkoutSession(workout);

        GoalProgressObserver goalObserver = new GoalProgressObserver(goal);
        StreakObserver streakObserver = new StreakObserver(user);
        RestNotificationObserver restObserver = new RestNotificationObserver(3);

        session.addObserver(goalObserver);
        session.addObserver(streakObserver);
        session.addObserver(restObserver);

        // =========================
        // 5. Start Workout Session
        // =========================
        session.startWorkout();

        for (Exercise e : workout.getExercises()) {
            session.completeExercise(e);
            session.endRest(e); // simulate rest ending
        }

        session.endWorkout();

        // =========================
        // 6. Scheduler (Optional Demo)
        // =========================
        WorkoutScheduler scheduler = new WorkoutScheduler();
        scheduler.startWorkout();
        scheduler.scheduleExercise(2); // simulate 2 sec rest
        scheduler.stopWorkout();

        // =========================
        // 7. Decorator Pattern
        // =========================
        WorkoutComponent decoratedWorkout = new BaseWorkout(workout);
        decoratedWorkout = new WarmUpWrapper(decoratedWorkout, 2);
        decoratedWorkout = new CoolDownWrapper(decoratedWorkout, 2);
        decoratedWorkout = new GoalNotesWrapper(decoratedWorkout, "Keep good form!");

        System.out.println("\nRunning Decorated Workout:");
        decoratedWorkout.execute();

        System.out.println("\nDescription:");
        System.out.println(decoratedWorkout.getDescription());
    }
}