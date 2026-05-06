package Observer;

import Main.Goal;

public class GoalProgressObserver implements WorkoutObserver {

    private Goal goal;

    public GoalProgressObserver(Goal goal) {
        this.goal = goal;
    }

    @Override
    public void update(WorkoutEvent event) {

        if (event.getType() == EventType.EXERCISE_COMPLETED && event.getExercise() != null) {

            double liftedWeight = event.getExercise().getWeight();

            // Update goal with the latest lifted weight
            goal.update(liftedWeight);

            System.out.println("Goal updated with weight: " + liftedWeight);
            System.out.println("Current Progress: " + String.format("%.2f", goal.getProgress()) + "%");
        }

        if (event.getType() == EventType.WORKOUT_ENDED) {
            System.out.println("Final Goal Progress: " +
                    String.format("%.2f", goal.getProgress()) + "%");
        }
    }
}
