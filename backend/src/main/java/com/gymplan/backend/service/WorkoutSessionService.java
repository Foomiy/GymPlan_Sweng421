package com.gymplan.backend.service;

import com.gymplan.backend.model.WorkoutSessionRecord;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class WorkoutSessionService {

    private final List<WorkoutSessionRecord> completedSessions = new ArrayList<>();

    public WorkoutSessionRecord saveSession(WorkoutSessionRecord session) {
        session.setId(UUID.randomUUID().toString());
        session.setCompletedAt(LocalDateTime.now());

        completedSessions.add(session);

        return session;
    }

    public List<WorkoutSessionRecord> getCompletedSessions() {
        return completedSessions;
    }
}