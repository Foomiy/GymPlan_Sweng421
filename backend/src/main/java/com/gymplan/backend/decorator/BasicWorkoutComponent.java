package com.gymplan.backend.decorator;

import com.gymplan.backend.model.Workout;

public class BasicWorkoutComponent implements WorkoutComponent {
    private final Workout workout;

    public BasicWorkoutComponent(Workout workout) {
        this.workout = workout;
    }

    @Override
    public Workout getWorkout() {
        return workout;
    }
}