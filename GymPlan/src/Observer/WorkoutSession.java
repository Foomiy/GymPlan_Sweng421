package Observer;

import java.util.ArrayList;
import java.util.List;

import Main.Workout;
import Main.Exercise;

public class WorkoutSession implements WorkoutIF {

    private Workout workout;
    private List<WorkoutObserver> observers;

    public WorkoutSession(Workout workout) {
        this.workout = workout;
        this.observers = new ArrayList<>();
    }

    // Observer management
    @Override
    public void addObserver(WorkoutObserver observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(WorkoutObserver observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers(WorkoutEvent event) {
        for (WorkoutObserver observer : observers) {
            observer.update(event);
        }
    }

    // Core session logic
    public void startWorkout() {
        System.out.println("Workout started: " + workout.getName());
        notifyObservers(new WorkoutEvent(EventType.WORKOUT_STARTED, null));
    }

    public void completeExercise(Exercise exercise) {
        exercise.setCompleted(true);
        System.out.println("Completed exercise: " + exercise.getName());

        notifyObservers(new WorkoutEvent(EventType.EXERCISE_COMPLETED, exercise));

        // trigger rest period after exercise
        notifyObservers(new WorkoutEvent(EventType.REST_STARTED, exercise));
    }

    public void endRest(Exercise exercise) {
        notifyObservers(new WorkoutEvent(EventType.REST_ENDED, exercise));
    }

    public void endWorkout() {
        workout.markComplete();
        System.out.println("Workout completed: " + workout.getName());

        notifyObservers(new WorkoutEvent(EventType.WORKOUT_ENDED, null));
    }

    public Workout getWorkout() {
        return workout;
    }
}
