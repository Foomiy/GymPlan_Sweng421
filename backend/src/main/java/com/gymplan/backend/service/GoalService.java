package com.gymplan.backend.service;

import com.gymplan.backend.model.Exercise;
import com.gymplan.backend.model.Goal;
import com.gymplan.backend.model.WorkoutSessionRecord;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class GoalService {
    private final List<Goal> goals = new ArrayList<>();

    public Goal addGoal(Goal goal) {
        goal.setId(UUID.randomUUID().toString());

        if (goal.getHistory() == null || goal.getHistory().isEmpty()) {
            goal.setHistory(new ArrayList<>());
            goal.getHistory().add(
                    new Goal.GoalHistoryEntry(
                            java.time.LocalDateTime.now(),
                            goal.getCurrentWeight()
                    )
            );
        }

        goals.add(goal);
        return goal;
    }

    public List<Goal> getGoals() {
        return goals;
    }

    public void updateGoalsFromCompletedSession(WorkoutSessionRecord session) {
        if (session.getExercises() == null) {
            return;
        }

        for (Goal goal : goals) {
            for (Exercise exercise : session.getExercises()) {
                boolean sameExercise = exercise.getName() != null
                        && exercise.getName().equalsIgnoreCase(goal.getExerciseName());

                boolean hasWeight = exercise.getWeight() != null && exercise.getWeight() > 0;

                if (sameExercise && hasWeight) {
                    goal.updateProgress(exercise.getWeight());
                }
            }
        }
    }
}