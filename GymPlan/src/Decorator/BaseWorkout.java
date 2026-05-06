package Decorator;

import Main.Workout;

public class BaseWorkout implements WorkoutComponent {

    private Workout workout;

    public BaseWorkout(Workout workout) {
        this.workout = workout;
    }

    @Override
    public void execute() {
        System.out.println("Starting workout: " + workout.getName());
    }

    @Override
    public String getDescription() {
        return "Workout: " + workout.getName();
    }

    public Workout getWorkout() {
        return workout;
    }
}
