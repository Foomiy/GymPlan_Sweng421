package Observer;

public interface WorkoutIF {
    public void addObserver(WorkoutObserver observer);
    public void removeObserver(WorkoutObserver observer);
    public void notifyObservers(WorkoutEvent event);
}
