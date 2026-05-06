package com.gymplan.backend.scheduler;

import java.time.LocalDateTime;
import java.util.UUID;

public class ScheduledTask {
    private final String id;
    private final String name;
    private final LocalDateTime requestedAt;

    public ScheduledTask(String name) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.requestedAt = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDateTime getRequestedAt() {
        return requestedAt;
    }
}