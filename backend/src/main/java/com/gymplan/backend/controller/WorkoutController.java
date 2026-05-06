package com.gymplan.backend.controller;

import com.gymplan.backend.model.Workout;
import com.gymplan.backend.service.WorkoutService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping("/api/test")
    public String test() {
        return "Backend is working!";
    }

    @GetMapping("/api/workouts/{type}")
    public Workout getWorkout(@PathVariable String type) {
        return switch (type.toLowerCase()) {
            case "chest" -> workoutService.getChestWorkout();
            case "back" -> workoutService.getBackWorkout();
            case "legs" -> workoutService.getLegWorkout();
            case "upper-body" -> workoutService.getUpperBodyWorkout();
            case "lower-body" -> workoutService.getLowerBodyWorkout();
            case "push" -> workoutService.getPushWorkout();
            case "pull" -> workoutService.getPullWorkout();
            case "shoulders-and-arms" -> workoutService.getShouldersAndArmsWorkout();
            default -> workoutService.getUpperBodyWorkout();
        };
    }
}