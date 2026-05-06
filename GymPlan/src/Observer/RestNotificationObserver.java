package Observer;

public class RestNotificationObserver implements WorkoutObserver {

    private int restTimeSeconds;

    public RestNotificationObserver(int restTimeSeconds) {
        this.restTimeSeconds = restTimeSeconds;
    }

    @Override
    public void update(WorkoutEvent event) {
        if (event.getType() == EventType.REST_STARTED) {
            startRestTimer(event);
        }
    }

    private void startRestTimer(WorkoutEvent event) {
        try {
            System.out.println("Rest started for " + restTimeSeconds + " seconds.");

            Thread.sleep(restTimeSeconds * 1000L);

            System.out.println("Rest period is over. Get ready for the next exercise!");

        } catch (InterruptedException e) {
            System.out.println("Rest timer was interrupted.");
            Thread.currentThread().interrupt();
        }
    }

    public int getRestTimeSeconds() {
        return restTimeSeconds;
    }

    public void setRestTimeSeconds(int restTimeSeconds) {
        this.restTimeSeconds = restTimeSeconds;
    }
}
