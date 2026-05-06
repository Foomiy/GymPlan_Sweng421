package Main;

public class Goal {
    private double targetWeight;
    private double currentWeight;

    public Goal(double targetWeight, double currentWeight) {
        this.targetWeight = targetWeight;
        this.currentWeight = currentWeight;
    }

    public double getProgress() {
        if (targetWeight <= 0) {
            return 0;
        }

        return (currentWeight / targetWeight) * 100.0;
    }

    public void update(double current) {
        this.currentWeight = current;
    }

    public double getTargetWeight() {
        return targetWeight;
    }

    public double getCurrentWeight() {
        return currentWeight;
    }

    @Override
    public String toString() {
        return "Lifting Goal -> Target Weight: " + targetWeight +
                ", Current Weight: " + currentWeight +
                ", Progress: " + String.format("%.2f", getProgress()) + "%";
    }
}