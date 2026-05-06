package com.gymplan.backend.builder;

import com.gymplan.backend.model.Exercise;
import com.gymplan.backend.model.Workout;

public interface WorkoutBuilder {
    WorkoutBuilder setName(String name);

    WorkoutBuilder setDescription(String description);

    WorkoutBuilder addExercise(Exercise exercise);

    Workout build();
}