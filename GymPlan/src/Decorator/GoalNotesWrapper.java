package Decorator;

public class GoalNotesWrapper extends WorkoutDecorator {

    private String notes;

    public GoalNotesWrapper(WorkoutComponent component, String notes) {
        super(component);
        this.notes = notes;
    }

    @Override
    public void execute() {
        super.execute(); // run workout (and any previous wrappers)

        System.out.println("Workout Notes:");
        System.out.println(notes);
    }

    @Override
    public String getDescription() {
        return component.getDescription() + " + Notes";
    }

    public String getNotes() {
        return notes;
    }
}