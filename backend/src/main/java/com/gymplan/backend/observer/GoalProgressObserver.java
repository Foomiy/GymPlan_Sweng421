package com.gymplan.backend.observer;

import com.gymplan.backend.model.WorkoutSessionRecord;
import com.gymplan.backend.service.GoalService;
import org.springframework.stereotype.Component;

@Component
public class GoalProgressObserver implements WorkoutSessionObserver {
    private final GoalService goalService;

    public GoalProgressObserver(GoalService goalService) {
        this.goalService = goalService;
    }

    @Override
    public void onSessionCompleted(WorkoutSessionRecord session) {
        goalService.updateGoalsFromCompletedSession(session);

        System.out.println(
                "Observer GoalProgress: Checked goals after completed workout -> "
                        + session.getWorkoutName()
        );
    }
}