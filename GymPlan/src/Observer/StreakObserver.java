package Observer;

import Main.User;

public class StreakObserver implements WorkoutObserver {

    private User user;

    public StreakObserver(User user) {
        this.user = user;
    }

    @Override
    public void update(WorkoutEvent event) {
        if (event.getType() == EventType.WORKOUT_ENDED) {
            user.updateStreak();

            System.out.println("Workout completed. Streak updated!");
            System.out.println("Current streak: " + user.getStreakCount());
        }
    }
}