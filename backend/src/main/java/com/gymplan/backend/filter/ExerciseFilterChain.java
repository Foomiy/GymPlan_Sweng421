package com.gymplan.backend.filter;

import com.gymplan.backend.model.Exercise;
import java.util.ArrayList;
import java.util.List;

public class ExerciseFilterChain {
    private final List<ExerciseFilter> filters = new ArrayList<>();

    public ExerciseFilterChain addFilter(ExerciseFilter filter) {
        filters.add(filter);
        return this;
    }

    public boolean matches(Exercise exercise) {
        return filters.stream().allMatch(filter -> filter.matches(exercise));
    }
}