package com.gymplan.backend.controller;

import com.gymplan.backend.model.Goal;
import com.gymplan.backend.service.GoalService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "http://localhost:8080")
public class GoalController {
    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @PostMapping
    public Goal addGoal(@RequestBody Goal goal) {
        return goalService.addGoal(goal);
    }

    @GetMapping
    public List<Goal> getGoals() {
        return goalService.getGoals();
    }
}