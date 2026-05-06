package Builder;

import Main.Exercise;
import Main.Workout;

public class CustomWorkout implements WorkoutBuilder {

    private Workout workout;

    public CustomWorkout() {
        this.workout = new Workout("Unnamed Workout");
    }

    @Override
    public WorkoutBuilder setName(String name) {
        this.workout = new Workout(name);
        return this;
    }

    @Override
    public WorkoutBuilder addExercise(Exercise e) {
        workout.addExercise(e);
        return this;
    }

    @Override
    public WorkoutBuilder removeExercise(Exercise e) {
        workout.removeExercise(e);
        return this;
    }

    @Override
    public Workout build() {
        return workout;
    }
}
