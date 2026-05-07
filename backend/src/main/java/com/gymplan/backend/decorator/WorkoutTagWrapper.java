package com.gymplan.backend.decorator;

import com.gymplan.backend.model.Exercise;
import com.gymplan.backend.model.Workout;
import java.util.ArrayList;
import java.util.List;

public class WorkoutTagWrapper extends WorkoutDecorator {

    public WorkoutTagWrapper(WorkoutComponent workoutComponent) {
        super(workoutComponent);
    }

    @Override
    public Workout getWorkout() {
        Workout workout = super.getWorkout();

        List<String> tags = new ArrayList<>();

        if (workout.getExercises() != null) {
            boolean hasBeginner = workout.getExercises()
                    .stream()
                    .anyMatch(exercise -> "Beginner".equalsIgnoreCase(exercise.getDifficulty()));

            boolean hasIntermediate = workout.getExercises()
                    .stream()
                    .anyMatch(exercise -> "Intermediate".equalsIgnoreCase(exercise.getDifficulty()));

            boolean hasBodyweight = workout.getExercises()
                    .stream()
                    .map(Exercise::getEquipment)
                    .anyMatch(equipment -> equipment != null && equipment.equalsIgnoreCase("Bodyweight"));

            if (hasBeginner) {
                tags.add("Beginner Friendly");
            }

            if (hasIntermediate) {
                tags.add("Strength Focused");
            }

            if (hasBodyweight) {
                tags.add("Bodyweight Option");
            }
        }

        workout.setTags(tags);

        return workout;
    }
}