package com.gymplan.backend.scheduler;

import java.util.LinkedList;
import java.util.Queue;
import org.springframework.stereotype.Component;

@Component
public class WorkoutScheduler {
    private final Queue<ScheduledTask> waitingTasks = new LinkedList<>();
    private ScheduledTask currentTask;
    private final String schedulingPolicy = "FCFS";

    public synchronized void requestAccess(ScheduledTask task) throws InterruptedException {
        waitingTasks.add(task);

        while (currentTask != null || waitingTasks.peek() != task) {
            wait();
        }

        waitingTasks.remove();
        currentTask = task;

        System.out.println(
                "Scheduler: Task granted access -> "
                        + task.getName()
                        + " using policy "
                        + schedulingPolicy
        );
    }

    public synchronized void releaseAccess(ScheduledTask task) {
        if (currentTask != null && currentTask.getId().equals(task.getId())) {
            System.out.println("Scheduler: Task released access -> " + task.getName());
            currentTask = null;
            notifyAll();
        }
    }

    public synchronized String getSchedulingPolicy() {
        return schedulingPolicy;
    }

    public synchronized int getWaitingTaskCount() {
        return waitingTasks.size();
    }

    public synchronized String getCurrentTaskName() {
        return currentTask == null ? null : currentTask.getName();
    }
}