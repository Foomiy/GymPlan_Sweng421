package com.gymplan.backend.observer;

import com.gymplan.backend.model.WorkoutSessionRecord;
import java.time.LocalDateTime;
import org.springframework.stereotype.Component;

@Component
public class SessionStatsObserver implements WorkoutSessionObserver {
    private int totalCompletedSessions = 0;
    private String mostRecentWorkoutName;
    private LocalDateTime mostRecentCompletedAt;

    @Override
    public synchronized void onSessionCompleted(WorkoutSessionRecord session) {
        totalCompletedSessions++;
        mostRecentWorkoutName = session.getWorkoutName();
        mostRecentCompletedAt = session.getCompletedAt();
    }

    public synchronized int getTotalCompletedSessions() {
        return totalCompletedSessions;
    }

    public synchronized String getMostRecentWorkoutName() {
        return mostRecentWorkoutName;
    }

    public synchronized LocalDateTime getMostRecentCompletedAt() {
        return mostRecentCompletedAt;
    }
}