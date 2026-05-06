package com.gymplan.backend.controller;

import com.gymplan.backend.model.WorkoutSessionRecord;
import com.gymplan.backend.observer.SessionStatsObserver;
import com.gymplan.backend.service.WorkoutSessionService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "http://localhost:8080")
public class WorkoutSessionController {

    private final WorkoutSessionService workoutSessionService;
    private final SessionStatsObserver sessionStatsObserver;

    public WorkoutSessionController(
            WorkoutSessionService workoutSessionService,
            SessionStatsObserver sessionStatsObserver
    ) {
        this.workoutSessionService = workoutSessionService;
        this.sessionStatsObserver = sessionStatsObserver;
    }

    @PostMapping
    public WorkoutSessionRecord saveSession(@RequestBody WorkoutSessionRecord session) {
        return workoutSessionService.saveSession(session);
    }

    @GetMapping
    public List<WorkoutSessionRecord> getCompletedSessions() {
        return workoutSessionService.getCompletedSessions();
    }

    @GetMapping("/stats")
    public Map<String, Object> getSessionStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalCompletedSessions", sessionStatsObserver.getTotalCompletedSessions());
        stats.put("mostRecentWorkoutName", sessionStatsObserver.getMostRecentWorkoutName());
        stats.put("mostRecentCompletedAt", sessionStatsObserver.getMostRecentCompletedAt());
        return stats;
    }
}