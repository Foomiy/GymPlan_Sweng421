package com.gymplan.backend.observer;

import com.gymplan.backend.model.WorkoutSessionRecord;
import org.springframework.stereotype.Component;

@Component
public class SessionLoggingObserver implements WorkoutSessionObserver {

    @Override
    public void onSessionCompleted(WorkoutSessionRecord session) {
        System.out.println(
                "Observer Log: Completed workout saved -> "
                        + session.getWorkoutName()
                        + " at "
                        + session.getCompletedAt()
        );
    }
}