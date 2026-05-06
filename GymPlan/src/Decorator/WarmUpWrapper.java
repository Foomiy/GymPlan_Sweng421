package Decorator;

public class WarmUpWrapper extends WorkoutDecorator {

    private int duration; // in seconds

    public WarmUpWrapper(WorkoutComponent component, int duration) {
        super(component);
        this.duration = duration;
    }

    @Override
    public void execute() {
        System.out.println("Starting warm-up for " + duration + " seconds...");

        try {
            Thread.sleep(duration * 1000L);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("Warm-up complete.");

        super.execute(); // continue with the main workout
    }

    @Override
    public String getDescription() {
        return component.getDescription() + " + Warm-up (" + duration + "s)";
    }
}