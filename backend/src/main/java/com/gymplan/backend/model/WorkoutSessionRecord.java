package com.gymplan.backend.model;

import java.time.LocalDateTime;
import java.util.List;

public class WorkoutSessionRecord {
    private String id;
    private String workoutName;
    private LocalDateTime completedAt;
    private List<Exercise> exercises;

    public WorkoutSessionRecord() {
    }

    public WorkoutSessionRecord(String id, String workoutName, LocalDateTime completedAt, List<Exercise> exercises) {
        this.id = id;
        this.workoutName = workoutName;
        this.completedAt = completedAt;
        this.exercises = exercises;
    }

    public String getId() {
        return id;
    }

    public String getWorkoutName() {
        return workoutName;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setWorkoutName(String workoutName) {
        this.workoutName = workoutName;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }
}