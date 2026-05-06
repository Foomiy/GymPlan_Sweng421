package Observer;
import Main.Exercise;
public class WorkoutEvent {
    private EventType type;
    private Exercise exercise;

    public WorkoutEvent(EventType type, Exercise exercise) {
        this.type = type;
        this.exercise = exercise;
    }

    public EventType getType() {
        return type;
    }

    public Exercise getExercise() {
        return exercise;
    }
}
