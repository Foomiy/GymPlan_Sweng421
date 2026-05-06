package com.gymplan.backend.service;

import com.gymplan.backend.model.WorkoutSessionRecord;
import com.gymplan.backend.observer.WorkoutSessionObserver;
import com.gymplan.backend.scheduler.ScheduledTask;
import com.gymplan.backend.scheduler.WorkoutScheduler;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class WorkoutSessionService {

    private final List<WorkoutSessionRecord> completedSessions = new ArrayList<>();
    private final List<WorkoutSessionObserver> observers;
    private final WorkoutScheduler workoutScheduler;

    public WorkoutSessionService(
            List<WorkoutSessionObserver> observers,
            WorkoutScheduler workoutScheduler
    ) {
        this.observers = observers;
        this.workoutScheduler = workoutScheduler;
    }

    public WorkoutSessionRecord saveSession(WorkoutSessionRecord session) {
        ScheduledTask task = new ScheduledTask("Save completed workout session");
        boolean hasAccess = false;

        try {
            workoutScheduler.requestAccess(task);
            hasAccess = true;

            session.setId(UUID.randomUUID().toString());
            session.setCompletedAt(LocalDateTime.now());

            completedSessions.add(session);

            notifySessionCompleted(session);

            return session;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException(
                    "Session save was interrupted while waiting for scheduler access.",
                    e
            );
        } finally {
            if (hasAccess) {
                workoutScheduler.releaseAccess(task);
            }
        }
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