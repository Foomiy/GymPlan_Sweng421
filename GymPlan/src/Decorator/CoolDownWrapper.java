package Decorator;

public class CoolDownWrapper extends WorkoutDecorator {

    private int duration; // in seconds

    public CoolDownWrapper(WorkoutComponent component, int duration) {
        super(component);
        this.duration = duration;
    }

    @Override
    public void execute() {
        super.execute(); // run the workout first

        System.out.println("Starting cool-down for " + duration + " seconds...");

        try {
            Thread.sleep(duration * 1000L);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("Cool-down complete.");
    }

    @Override
    public String getDescription() {
        return component.getDescription() + " + Cool-down (" + duration + "s)";
    }
}
