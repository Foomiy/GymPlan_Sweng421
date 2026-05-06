package com.gymplan.backend.controller;

import com.gymplan.backend.model.WorkoutSessionRecord;
import com.gymplan.backend.service.WorkoutSessionService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "http://localhost:8080")
public class WorkoutSessionController {

    private final WorkoutSessionService workoutSessionService;

    public WorkoutSessionController(WorkoutSessionService workoutSessionService) {
        this.workoutSessionService = workoutSessionService;
    }

    @PostMapping
    public WorkoutSessionRecord saveSession(@RequestBody WorkoutSessionRecord session) {
        return workoutSessionService.saveSession(session);
    }

    @GetMapping
    public List<WorkoutSessionRecord> getCompletedSessions() {
        return workoutSessionService.getCompletedSessions();
    }
}