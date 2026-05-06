package Scheduler;

import java.util.ArrayList;
import java.util.List;

import Observer.EventType;
import Observer.WorkoutEvent;
import Observer.WorkoutObserver;

public class WorkoutScheduler {

    private int totalWorkoutTime;
    private List<TimerTask> exerciseThreads;
    private TimerTask totalTimeThread;
    private List<WorkoutObserver> observers;

    public WorkoutScheduler() {
        this.totalWorkoutTime = 0;
        this.exerciseThreads = new ArrayList<>();
        this.totalTimeThread = null;
        this.observers = new ArrayList<>();
    }

    public void startWorkout() {
        totalTimeThread = new TimerTask(0);
        System.out.println("Workout scheduler started.");
    }

    public void stopWorkout() {
        if (totalTimeThread != null) {
            totalTimeThread.pause();
        }

        for (TimerTask task : exerciseThreads) {
            task.pause();
        }

        System.out.println("Workout scheduler stopped.");
    }

    public void scheduleExercise(int seconds) {
        TimerTask task = new TimerTask(seconds);
        exerciseThreads.add(task);

        task.run(); // blocking for now (we can improve later)

        totalWorkoutTime += seconds;

        notifyObservers(new WorkoutEvent(EventType.REST_ENDED, null));
    }

    public int getTotalTime() {
        return totalWorkoutTime;
    }

    public void notifyObservers(WorkoutEvent e) {
        for (WorkoutObserver observer : observers) {
            observer.update(e);
        }
    }

    public void addObserver(WorkoutObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(WorkoutObserver observer) {
        observers.remove(observer);
    }
}