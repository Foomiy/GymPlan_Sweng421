package com.gymplan.backend.filter;

import com.gymplan.backend.model.Exercise;

public class DifficultyFilter implements ExerciseFilter {
    private final String difficulty;

    public DifficultyFilter(String difficulty) {
        this.difficulty = difficulty;
    }

    @Override
    public boolean matches(Exercise exercise) {
        if (difficulty == null || difficulty.isBlank()) {
            return true;
        }

        return exercise.getDifficulty() != null
                && exercise.getDifficulty().equalsIgnoreCase(difficulty);
    }
}