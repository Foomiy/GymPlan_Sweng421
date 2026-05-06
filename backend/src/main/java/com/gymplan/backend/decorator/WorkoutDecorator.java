package com.gymplan.backend.decorator;

import com.gymplan.backend.model.Workout;

public abstract class WorkoutDecorator implements WorkoutComponent {
    protected final WorkoutComponent workoutComponent;

    public WorkoutDecorator(WorkoutComponent workoutComponent) {
        this.workoutComponent = workoutComponent;
    }

    @Override
    public Workout getWorkout() {
        return workoutComponent.getWorkout();
    }
}