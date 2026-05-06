package Main;

import java.util.ArrayList;
import java.util.List;

public class User {
    private String username;
    private int streakCount;
    private boolean notificationEnabled;
    private List<Workout> workouts;
    private List<Goal> goals;

    public User(String username) {
        this.username = username;
        this.streakCount = 0;
        this.notificationEnabled = true;
        this.workouts = new ArrayList<>();
        this.goals = new ArrayList<>();
    }

    public void addGoal(Goal goal) {
        goals.add(goal);
    }

    public void updateStreak() {
        streakCount++;
    }

    public void saveWorkout(Workout w) {
        workouts.add(w);
        System.out.println("Workout \"" + w.getName() + "\" saved to user " + username + ".");
    }

    public void toggleNotification() {
        notificationEnabled = !notificationEnabled;
    }

    public String getUsername() {
        return username;
    }

    public int getStreakCount() {
        return streakCount;
    }

    public boolean isNotificationEnabled() {
        return notificationEnabled;
    }

    public List<Workout> getWorkouts() {
        return workouts;
    }

    public List<Goal> getGoals() {
        return goals;
    }

    @Override
    public String toString() {
        return "User: " + username +
                "\nStreak Count: " + streakCount +
                "\nNotifications Enabled: " + notificationEnabled +
                "\nSaved Workouts: " + workouts.size() +
                "\nGoals: " + goals.size();
    }
}
