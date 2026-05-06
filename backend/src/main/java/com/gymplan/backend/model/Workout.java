package com.gymplan.backend.model;

import java.util.List;

public class Workout {
    private String name;
    private String description;
    private List<Exercise> exercises;

    private Integer estimatedDurationMinutes;
    private List<String> tags;

    public Workout() {
    }

    public Workout(String name, String description, List<Exercise> exercises) {
        this.name = name;
        this.description = description;
        this.exercises = exercises;
    }

    public Workout(
            String name,
            String description,
            List<Exercise> exercises,
            Integer estimatedDurationMinutes,
            List<String> tags
    ) {
        this.name = name;
        this.description = description;
        this.exercises = exercises;
        this.estimatedDurationMinutes = estimatedDurationMinutes;
        this.tags = tags;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public Integer getEstimatedDurationMinutes() {
        return estimatedDurationMinutes;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }

    public void setEstimatedDurationMinutes(Integer estimatedDurationMinutes) {
        this.estimatedDurationMinutes = estimatedDurationMinutes;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}