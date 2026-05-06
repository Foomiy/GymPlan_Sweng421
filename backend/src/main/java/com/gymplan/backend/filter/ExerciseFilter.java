package com.gymplan.backend.filter;

import com.gymplan.backend.model.Exercise;

public interface ExerciseFilter {
    boolean matches(Exercise exercise);
}