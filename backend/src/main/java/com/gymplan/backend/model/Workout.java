package com.gymplan.backend.model;

import java.util.List;

public class Workout {
    private String name;
    private String description;
    private List<Exercise> exercises;

    public Workout() {
    }

    public Workout(String name, String description, List<Exercise> exercises) {
        this.name = name;
        this.description = description;
        this.exercises = exercises;
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

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }
}