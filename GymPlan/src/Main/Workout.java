package Main;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Workout {
    private String name;
    private Date date;
    private boolean isCompleted;
    private List<Exercise> exercises;

    public Workout(String name) {
        this.name = name;
        this.date = new Date(); // default to current date
        this.isCompleted = false;
        this.exercises = new ArrayList<>();
    }

    // UML methods
    public void addExercise(Exercise e) {
        exercises.add(e);
    }

    public void removeExercise(Exercise e) {
        exercises.remove(e);
    }

    public void markComplete() {
        this.isCompleted = true;

        // Optional: mark all exercises complete as well
        for (Exercise e : exercises) {
            e.setCompleted(true);
        }
    }

    public void save() {
        // Placeholder for persistence (DB/file later)
        System.out.println("Workout \"" + name + "\" saved.");
    }

    // Getters (needed for other systems later)
    public String getName() {
        return name;
    }

    public Date getDate() {
        return date;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Workout: ").append(name).append("\n");
        sb.append("Date: ").append(date).append("\n");
        sb.append("Completed: ").append(isCompleted).append("\n");
        sb.append("Exercises:\n");

        for (Exercise e : exercises) {
            sb.append(" - ").append(e.toString()).append("\n");
        }

        return sb.toString();
    }
}