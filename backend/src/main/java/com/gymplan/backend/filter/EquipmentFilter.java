package com.gymplan.backend.filter;

import com.gymplan.backend.model.Exercise;

public class EquipmentFilter implements ExerciseFilter {
    private final String equipment;

    public EquipmentFilter(String equipment) {
        this.equipment = equipment;
    }

    @Override
    public boolean matches(Exercise exercise) {
        if (equipment == null || equipment.isBlank()) {
            return true;
        }

        return exercise.getEquipment() != null
                && exercise.getEquipment().toLowerCase().contains(equipment.toLowerCase());
    }
}