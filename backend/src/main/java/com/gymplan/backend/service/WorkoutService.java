package com.gymplan.backend.service;

import com.gymplan.backend.builder.DefaultWorkoutDirector;
import com.gymplan.backend.decorator.BasicWorkoutComponent;
import com.gymplan.backend.decorator.EstimatedDurationDecorator;
import com.gymplan.backend.decorator.WorkoutComponent;
import com.gymplan.backend.decorator.WorkoutTagDecorator;
import com.gymplan.backend.model.Workout;
import org.springframework.stereotype.Service;

@Service
public class WorkoutService {

    private final DefaultWorkoutDirector defaultWorkoutDirector = new DefaultWorkoutDirector();

    public Workout getChestWorkout() {
        return decorateWorkout(defaultWorkoutDirector.buildChestWorkout());
    }

    public Workout getBackWorkout() {
        return decorateWorkout(defaultWorkoutDirector.buildBackWorkout());
    }

    public Workout getLegWorkout() {
        return decorateWorkout(defaultWorkoutDirector.buildLegWorkout());
    }

    public Workout getUpperBodyWorkout() {
        return decorateWorkout(defaultWorkoutDirector.buildUpperBodyWorkout());
    }

    public Workout getLowerBodyWorkout() {
        return decorateWorkout(defaultWorkoutDirector.buildLowerBodyWorkout());
    }

    public Workout getPushWorkout() {
        return decorateWorkout(defaultWorkoutDirector.buildPushWorkout());
    }

    public Workout getPullWorkout() {
        return decorateWorkout(defaultWorkoutDirector.buildPullWorkout());
    }

    public Workout getShouldersAndArmsWorkout() {
        return decorateWorkout(defaultWorkoutDirector.buildShouldersAndArmsWorkout());
    }

    private Workout decorateWorkout(Workout workout) {
        WorkoutComponent decoratedWorkout = new WorkoutTagDecorator(
                new EstimatedDurationDecorator(
                        new BasicWorkoutComponent(workout)
                )
        );

        return decoratedWorkout.getWorkout();
    }
}