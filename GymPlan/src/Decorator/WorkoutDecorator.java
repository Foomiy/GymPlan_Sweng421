package Decorator;

public abstract class WorkoutDecorator implements WorkoutComponent {

    protected WorkoutComponent component;

    public WorkoutDecorator(WorkoutComponent component) {
        this.component = component;
    }

    @Override
    public void execute() {
        component.execute();
    }

    @Override
    public String getDescription() {
        return component.getDescription();
    }
}