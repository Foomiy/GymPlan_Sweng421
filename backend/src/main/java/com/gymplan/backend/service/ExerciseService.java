package com.gymplan.backend.service;

import com.gymplan.backend.filter.BodyPartFilter;
import com.gymplan.backend.filter.DifficultyFilter;
import com.gymplan.backend.filter.EquipmentFilter;
import com.gymplan.backend.filter.ExerciseFilterChain;
import com.gymplan.backend.model.Exercise;
import com.gymplan.backend.model.Workout;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ExerciseService {

    private final WorkoutService workoutService;

    public ExerciseService(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    public List<Exercise> getAllExercises() {
        return List.of(
                workoutService.getChestWorkout(),
                workoutService.getBackWorkout(),
                workoutService.getLegWorkout(),
                workoutService.getUpperBodyWorkout(),
                workoutService.getLowerBodyWorkout(),
                workoutService.getPushWorkout(),
                workoutService.getPullWorkout(),
                workoutService.getShouldersAndArmsWorkout()
        )
                .stream()
                .map(Workout::getExercises)
                .flatMap(List::stream)
                .distinct()
                .toList();
    }

    public List<Exercise> filterExercises(String bodyPart, String equipment, String difficulty) {
        ExerciseFilterChain filterChain = new ExerciseFilterChain()
                .addFilter(new BodyPartFilter(bodyPart))
                .addFilter(new EquipmentFilter(equipment))
                .addFilter(new DifficultyFilter(difficulty));

        return getAllExercises()
                .stream()
                .filter(filterChain::matches)
                .toList();
    }
}