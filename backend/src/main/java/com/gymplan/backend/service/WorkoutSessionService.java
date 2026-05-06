package com.gymplan.backend.service;

import com.gymplan.backend.model.WorkoutSessionRecord;
import com.gymplan.backend.observer.WorkoutSessionObserver;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class WorkoutSessionService {

    private final List<WorkoutSessionRecord> completedSessions = new ArrayList<>();
    private final List<WorkoutSessionObserver> observers;

    public WorkoutSessionService(List<WorkoutSessionObserver> observers) {
        this.observers = observers;
    }

    public WorkoutSessionRecord saveSession(WorkoutSessionRecord session) {
        session.setId(UUID.randomUUID().toString());
        session.setCompletedAt(LocalDateTime.now());

        completedSessions.add(session);

        notifySessionCompleted(session);

        return session;
    }

    public List<WorkoutSessionRecord> getCompletedSessions() {
        return completedSessions;
    }

    private void notifySessionCompleted(WorkoutSessionRecord session) {
        for (WorkoutSessionObserver observer : observers) {
            observer.onSessionCompleted(session);
        }
    }
}