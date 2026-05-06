package Scheduler;

public class TimerTask {
    private int duration;
    private int elapsed;
    private boolean isRunning;

    public TimerTask(int duration) {
        this.duration = duration;
        this.elapsed = 0;
        this.isRunning = false;
    }

    public void run() {
        isRunning = true;

        try {
            while (elapsed < duration && isRunning) {
                Thread.sleep(1000);
                elapsed++;
                System.out.println("Time elapsed: " + elapsed + " / " + duration + " seconds");
            }
        } catch (InterruptedException e) {
            System.out.println("Timer was interrupted.");
            Thread.currentThread().interrupt();
        }

        isRunning = false;
    }

    public void pause() {
        isRunning = false;
    }

    public void reset() {
        elapsed = 0;
        isRunning = false;
    }

    public boolean isCompleted() {
        return elapsed >= duration;
    }

    public int getDuration() {
        return duration;
    }

    public int getElapsed() {
        return elapsed;
    }

    public boolean isRunning() {
        return isRunning;
    }
}