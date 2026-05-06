package com.gymplan.backend.builder;

import com.gymplan.backend.model.Exercise;
import com.gymplan.backend.model.Workout;
import java.util.ArrayList;
import java.util.List;

public class CustomWorkoutBuilder implements WorkoutBuilder {
    private String name;
    private String description;
    private final List<Exercise> exercises = new ArrayList<>();

    @Override
    public WorkoutBuilder setName(String name) {
        this.name = name;
        return this;
    }

    @Override
    public WorkoutBuilder setDescription(String description) {
        this.description = description;
        return this;
    }

    @Override
    public WorkoutBuilder addExercise(Exercise exercise) {
        this.exercises.add(exercise);
        return this;
    }

    @Override
    public Workout build() {
        return new Workout(name, description, new ArrayList<>(exercises));
    }
}