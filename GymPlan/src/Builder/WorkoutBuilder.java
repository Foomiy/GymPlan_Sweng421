package Builder;

import Main.Exercise;
import Main.Workout;

public interface WorkoutBuilder {
    WorkoutBuilder setName(String name);

    WorkoutBuilder addExercise(Exercise e);

    WorkoutBuilder removeExercise(Exercise e);

    Workout build();
}
