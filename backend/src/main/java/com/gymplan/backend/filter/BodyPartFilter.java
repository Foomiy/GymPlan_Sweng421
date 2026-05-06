package com.gymplan.backend.filter;

import com.gymplan.backend.model.Exercise;

public class BodyPartFilter implements ExerciseFilter {
    private final String bodyPart;

    public BodyPartFilter(String bodyPart) {
        this.bodyPart = bodyPart;
    }

    @Override
    public boolean matches(Exercise exercise) {
        if (bodyPart == null || bodyPart.isBlank()) {
            return true;
        }

        return exercise.getBodyPart() != null
                && exercise.getBodyPart().equalsIgnoreCase(bodyPart);
    }
}