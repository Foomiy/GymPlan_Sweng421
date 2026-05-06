package com.gymplan.backend.observer;

import com.gymplan.backend.model.WorkoutSessionRecord;

public interface WorkoutSessionObserver {
    void onSessionCompleted(WorkoutSessionRecord session);
}