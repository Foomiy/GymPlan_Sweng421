package com.gymplan.backend.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Goal {
    private String id;
    private String exerciseName;
    private double currentWeight;
    private double targetWeight;
    private List<GoalHistoryEntry> history = new ArrayList<>();

    public Goal() {
    }

    public Goal(String id, String exerciseName, double currentWeight, double targetWeight) {
        this.id = id;
        this.exerciseName = exerciseName;
        this.currentWeight = currentWeight;
        this.targetWeight = targetWeight;
        this.history.add(new GoalHistoryEntry(LocalDateTime.now(), currentWeight));
    }

    public String getId() {
        return id;
    }

    public String getExerciseName() {
        return exerciseName;
    }

    public double getCurrentWeight() {
        return currentWeight;
    }

    public double getTargetWeight() {
        return targetWeight;
    }

    public List<GoalHistoryEntry> getHistory() {
        return history;
    }

    public double getProgressPercent() {
        if (targetWeight <= 0) {
            return 0;
        }

        return Math.min(100, Math.round((currentWeight / targetWeight) * 100));
    }

    public void updateProgress(double newWeight) {
        if (newWeight > currentWeight) {
            currentWeight = newWeight;
            history.add(new GoalHistoryEntry(LocalDateTime.now(), newWeight));
        }
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setExerciseName(String exerciseName) {
        this.exerciseName = exerciseName;
    }

    public void setCurrentWeight(double currentWeight) {
        this.currentWeight = currentWeight;
    }

    public void setTargetWeight(double targetWeight) {
        this.targetWeight = targetWeight;
    }

    public void setHistory(List<GoalHistoryEntry> history) {
        this.history = history;
    }

    public static class GoalHistoryEntry {
        private LocalDateTime date;
        private double weight;

        public GoalHistoryEntry() {
        }

        public GoalHistoryEntry(LocalDateTime date, double weight) {
            this.date = date;
            this.weight = weight;
        }

        public LocalDateTime getDate() {
            return date;
        }

        public double getWeight() {
            return weight;
        }

        public void setDate(LocalDateTime date) {
            this.date = date;
        }

        public void setWeight(double weight) {
            this.weight = weight;
        }
    }
}