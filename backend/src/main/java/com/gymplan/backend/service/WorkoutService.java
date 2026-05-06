package com.gymplan.backend.service;

import com.gymplan.backend.builder.DefaultWorkoutDirector;
import com.gymplan.backend.model.Workout;
import org.springframework.stereotype.Service;

@Service
public class WorkoutService {

    private final DefaultWorkoutDirector defaultWorkoutDirector = new DefaultWorkoutDirector();

    public Workout getChestWorkout() {
        return defaultWorkoutDirector.buildChestWorkout();
    }

    public Workout getBackWorkout() {
        return defaultWorkoutDirector.buildBackWorkout();
    }

    public Workout getLegWorkout() {
        return defaultWorkoutDirector.buildLegWorkout();
    }

    public Workout getUpperBodyWorkout() {
        return defaultWorkoutDirector.buildUpperBodyWorkout();
    }

    public Workout getLowerBodyWorkout() {
        return defaultWorkoutDirector.buildLowerBodyWorkout();
    }

    public Workout getPushWorkout() {
        return defaultWorkoutDirector.buildPushWorkout();
    }

    public Workout getPullWorkout() {
        return defaultWorkoutDirector.buildPullWorkout();
    }

    public Workout getShouldersAndArmsWorkout() {
        return defaultWorkoutDirector.buildShouldersAndArmsWorkout();
    }
}