package com.gymplan.backend.decorator;

import com.gymplan.backend.model.Workout;

public class EstimatedDurationWrapper extends WorkoutDecorator {

    public EstimatedDurationWrapper(WorkoutComponent workoutComponent) {
        super(workoutComponent);
    }

    @Override
    public Workout getWorkout() {
        Workout workout = super.getWorkout();

        int exerciseCount = workout.getExercises() == null ? 0 : workout.getExercises().size();

        // Rough estimate:
        // 5 minutes per exercise + 5 minutes warmup/setup
        int estimatedMinutes = (exerciseCount * 5) + 5;

        workout.setEstimatedDurationMinutes(estimatedMinutes);

        return workout;
    }
}